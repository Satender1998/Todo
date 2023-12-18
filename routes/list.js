const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

// create
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);
    if (existingUser) {
      const list = new List({ title, body, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

// update
// router.put("/updateTask/:id", async (req, res) => {
//   try {
//     const { title, body } = req.body;
//     const list = await List.findByIdAndUpdate(req.params.id, { title, body });
//     list.save().then(() => res.status(200).json({ message: "Task Updated" }));
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.put("/updateTask/:id", async (req, res) => {
//   try {
//     const { title, body } = req.body;
//     console.log("Received request with id:", req.params.id);
//     console.log("Request body:", req.body);

//     const list = await List.findByIdAndUpdate(req.params.id, { title, body });
//     console.log("Updated list:", list);

//     list.save().then(() => res.status(200).json({ message: "Task Updated" }));
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.put("/updateTask/:id", async (req, res) => {
  console.log("Received update request:", req.body);
  try {
    const { title, body } = req.body;
    const list = await List.findByIdAndUpdate(req.params.id, { title, body });
    console.log("Updated list:", list);
    res.status(200).json({ message: "Task Updated" });
  } catch (error) {
    console.error("Error in updateTask route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// delete
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    // console.log(email);
    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });
    console.log(existingUser);
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ message: "Task deleted" })
      );
    }
  } catch (error) {
    console.log(error);
  }
});

// getTask
router.get("/getTasks/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });
    if (list.length !== 0) {
      res.status(200).json({ list: list });
    } else {
      res.status(200).json({ message: "No Tasks" });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
