const express = require("express");
const path = require("path");
// const timeout = require("connect-timeout");
const userModel = require("./model/userModelSchema");
const adminModel = require("./model/adminModel");
const dotenv = require("dotenv"); //we do not need to import dotenv every where once the dotenv.config(..) is used in root file as conn file is imported here so there we dont need to write this statement again , and its value can be accessed from anywhere through process.env.<nameOfVar>

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 3001;

const app = express();

try {
  require("./db/conn"); //this will automatically run the file
} catch (err) {
  console.log(err);
}

app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "frontend/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});
//basic auth
function authUser(req, res, next) {
  if ((req.headers.authorization = !"amFtZXNAZ21haWwuY29tMTIzNDU2Nzg=")) {
    res.status(403);
    return res.send("You need to sign in");
  }

  next();
}
//basic auth end

///shivam code integration
const adminSearch = express.Router();
app.use("/adminView", authUser, adminSearch); //night
adminSearch.route("/").get(viewTransaction).patch(updateAdminModel);

async function viewTransaction(req, res) {
  let queryMade = req.query;
  console.log(queryMade);

  let data = await adminModel
    .find({ submissionDate: queryMade.submissionDate })
    .exec();

  res.json({
    obj: data,
    msg: "ho gya dekh lo admin Model se kiya hai",
  });
}

async function updateAdminModel(req, res) {
  const { _id, cls, rollNo, Amount, Discount, submissionDate } = req.body;

  console.log("admin body", req.body);

  if (req.body._id) {
    // new model
    const data = await adminModel
      .updateOne(
        {
          _id,
        },
        {
          $push: {
            cls,
            rollNo,
            Amount,
            Discount,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )
      .exec();

    if (data) {
      console.log("updated " + data);
      res.json({
        obj: data,
        msg: "done",
        state: "UPDT_SUCCESS", //UPDT_SUCCESS="update successfull"
      });
    } else {
      console.log("failed to do so");
    }
  } else if (submissionDate) {
    const data = await adminModel
      .updateOne(
        {
          submissionDate,
        },
        {
          $push: {
            cls,
            rollNo,
            Amount,
            Discount,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )
      .exec();

    if (data) {
      console.log("updated " + data);
      res.json({
        obj: data,
        msg: "done",
        state: "UPDT_SUCCESS", //UPDT_SUCCESS="update successfull"
      });
    } else {
      console.log("failed to do so");
    }
  } else {
    res.json({
      msg: "body is empty",
      state: "EMTY_BDY", //EMTY_BDY="empty body"
    });
  }
}

app.get("/", (req, res) => res.send("hi"));

// ---------------------------------------------------------------------------------------------------------------
// for edit,preview and delete student record
const userEntry = express.Router();
app.use("/userEntry", authUser, userEntry); //night
userEntry.route("/").get(reviewOfEntry).patch(updateEntry).delete(deleteEntry);

//to review a entry
async function reviewOfEntry(req, res) {
  let queryMade = req.query;
  console.log(queryMade);

  let data = await userModel.find(queryMade).exec();
  console.log(data);

  res.json({
    obj: data,
    msg: "ho gya dekh lo",
    state: "FTCH_SUCCESS", //FTCH_SUCCESS=>Fetched Successfully
  });
}

async function updateEntry(req, res) {
  const _id = req.body._id;
  const dataToUpdate = {
    months: req.body.months,
    fees: req.body.fees,
    Discount: req.body.Discount,
  };
  console.log("body", req.body);

  if (req.body._id) {
    const obj = await userModel
      .findOneAndUpdate({ _id }, dataToUpdate, { new: true })
      .then((item) => {
        // console.log(item);
        res.status(200).json({
          msg: "data updated",
          updatedObj: item,
          state: "UPDT_SUCCESS", //UPDT_SUCCESS="update successfull"
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({
          msg: `Failed to update${err}`,
          state: "FAILED_UPDT", //FAILED_UPDT="failed update"
        });
      });
  } else {
    res.json({
      msg: "body is empty",
      state: "EMTY_BDY", //EMTY_BDY="empty body"
    });
  }
}

function deleteEntry(req, res) {}

// to create a new entry
const createNewEntry = express.Router();
app.use("/newentry", authUser, createNewEntry); //night
createNewEntry.route("/").post(makeEntry);

// ///shivam code integration end
//login funtion
const database = [
  {
    username: "user1",
    password: "pass1",
  },
  {
    username: "user2",
    password: "pass2",
  },
];
app.post("/login", function (req, res) {
  const userData = database.find((user) => user.username === req.body.username);
  if (userData) {
    if (userData.password !== req.body.password) {
      // Invalid password
      // setErrorMessages({ name: "pass", message: errors.pass });
      return res.send({ name: "pass", message: errors.pass });
    } else {
      let token = btoa(userData.username + userData.password);
      console.log(token);
      return res.send({ token: token });
      // setIsSubmitted(true);
    }
  } else {
    return res.send({ name: "uname", message: errors.uname });
  }
});
app.post("/islogin", function (req, res) {
  return res.send({
    status:
      req.headers.authorization &&
      req.headers.authorization === "amFtZXNAZ21haWwuY29tMTIzNDU2Nzg=",
  });
});

async function makeEntry(req, res) {
  let {
    cls,
    year,
    Name,
    months,
    rollNo,
    fatherName,
    motherName,
    fees,
    Discount,
  } = req.body;

  console.log("ab mai jaunga check krne");

  if (
    !cls ||
    !year ||
    !Name ||
    !rollNo ||
    !months ||
    !fatherName ||
    !motherName ||
    !Discount ||
    !fees
  ) {
    res.status(422).json({
      msg: "pls provide all the data",
      state: "INCOM_DATA", //INCOM_DATA= "incomplete data"
      received: req.body,
    });
  }

  console.log("ab mai jaunga create krne");
  try {
    const userExist = await userModel.findOne({ cls, year, rollNo });

    if (userExist) {
      res.status(402).json({ msg: "bad credentails", state: "ALRD_EXT" }); //ALRD_EXT=>already exist
    } else {
      console.log("create krne ghuss gya");

      let entryToBeMade = await userModel.create({
        cls,
        year,
        Name,
        rollNo,
        months,
        fatherName,
        motherName,
        fees,
        Discount,
      });

      console.log("create kr diya gya");

      if (entryToBeMade) {
        res.status(201).json({
          msg: "data saved",
          state: "CRT_USR", //code CRT_USR => "user created"
          obj: entryToBeMade,
        });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(422).json({ msg: `failed to upload data\n${err.name}` });
  }
}

if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));
  const path = require("path");

  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`listening at port ${PORT}`));
