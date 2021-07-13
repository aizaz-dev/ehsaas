import React, { useState} from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { db, storage } from "./fire";
import { Modal } from "@material-ui/core";
import { Backdrop } from "@material-ui/core";
import { Fade } from "@material-ui/core";

import { BeatLoader } from "react-spinners";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      marginLeft: "8vw",
      marginRight: "auto",
      width: "clamp(300px, 50vw, 1000px)",
    },
  },
}));
const useStyle = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Form() {
  const [name, setName] = useState("");
  const [fname, setFname] = useState("");
  const [cnic, setCnic] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [filefile, setfileFile] = useState(null);
  const [fileurl, setfileURL] = useState("");
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const clas = useStyle();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  function filehandleChange(e) {
    e.preventDefault();
    setfileFile(e.target.files[0]);
  }
 
  const filehandleUpload = (event) => {
    event.preventDefault();

    handleOpen();
    const ref1 = storage.ref(`/files/${filefile.name}`);
    const uploadTask1 = ref1.put(filefile);
    uploadTask1.on("state_changed", console.log, console.error, () => {
      ref1.getDownloadURL().then((fileUrl) => {
        setfileFile(null);
        setfileURL(fileUrl);
        db.collection("editorials").add({
          name: name,
          fatherNme: fname,
          cnic: cnic,
          district: district,
          city: city,
          mobile: mobile,
          imageUrl: fileUrl,
        });
        setList([
          ...list,
          {
            name: name,
            fatherNme: fname,
            cnic: cnic,
            district: district,
            city: city,
            mobile: mobile,
          },
        ]);
        setMobile("");
        setName("");
        setDistrict("");
        setCnic("");
        setCity("");
        setDistrict("");
        setFname("");
        setMobile("");
        handleClose();
      });
    });
  };

  return (
    <div style={{ width: "100%" }} className="MainFormDiv">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={clas.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {/* <h1>1111111111111111111</h1> */}
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 style={{color:"white", margin:"10px"}}>Please Wait While <br/> Loading...</h2 >
            <BeatLoader size="60px" loading="false" color="yellow" />
          </div>
        </Fade>
        {/* <h1>333333333333333</h1> */}
      </Modal>
      <img
        src="Ehsaas.png"
        alt=""
        style={{ width: "100%", marginTop: "20px" }}
      />
      <div
        style={{
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
          border: "1px solid rgba(0,255,0,0.9)",
          backgroundColor: "#00ff0022",
          padding: "8px",
        }}
      >
        <Typography variant="h5" Wrap>
          Students Who Applied For Ehsaas Scholarship Must Fill This Form.
        </Typography>
      </div>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            id="standard-error-helper-text"
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="standard-error-helper-text"
            label="Father Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="standard-error-helper-text"
            label="CNIC NO : Without Dashes"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="standard-error-helper-text"
            label="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="standard-error-helper-text"
            label="City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="standard-error-helper-text"
            label="Mobile No:"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div style={{ marginLeft: "30px" }}>
          <Button variant="contained" component="label" color="secondary">
            Select Image
            <input type="file" hidden onChange={filehandleChange} />
          </Button>
        </div>
        <div style={{ marginLeft: "30px" }}>
          <label>Image size must be maximum 5MB </label>
        </div>
        <div style={{ width: "100%",marginBottom:"50px" }}>
          <Button
            onClick={filehandleUpload}
            style={{ width: "80%", marginLeft: "30px", marginTop: "20px" }}
            variant="contained"
            color="secondary"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form;
