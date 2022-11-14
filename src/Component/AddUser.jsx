import react, { useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import { addUser } from "../Service/api";
import { useNavigate } from "react-router-dom";

const initialValue = {
  name: "",
  username: "",
  email: "",
  phone: "",
  pic: "",
};

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const AddUser = () => {
  const [user, setUser] = useState(initialValue);
  const { name, username, email, phone, pic } = user;

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  //  for image upload
  const [image, setImage] = useState("");
  // const [ url, setUrl ] = useState("");

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "project-website");
    data.append("cloud_name", "dh9rf3psk");
    fetch("  https://api.cloudinary.com/v1_1/dh9rf3psk/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        // setUrl(data.url.toString());
        setUser({ ...user, pic: data.url.toString() });
      })
      .catch((err) => console.log(err));
  };

  let navigate = useNavigate();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // dispaly error
  const displayError = () => {
    setOpenError(true);
  };
  const handleCloseError = () => {
    setOpenError(false);
  };
  //   const displaySuccess = () => {
  //     setOpenSuccess(true);
  //   };
  //   const handleCloseSuccess = () => {
  //     setOpenSuccess(false);
  //   };

  const addUserDetails = async () => {
    // handling error
    if (!user.name || !user.username || !user.email || !user.phone) {
      displayError();
    } else {
      await addUser(user);
      navigate("/");
      //   displaySuccess();
    }
  };

  return (
    <Container>
      <Typography variant="h4">Add User</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="name"
          value={name}
          id="my-input"
          required="true"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Username</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="username"
          value={username}
          id="my-input"
          required="true"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Email</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="email"
          value={email}
          id="my-input"
          required="true"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Phone</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="phone"
          value={phone}
          id="my-input"
          required="true"
        />
      </FormControl>
      <FormControl>
        <Input
          type="file"
          id="my-pic"
          onChange={(e) => setImage(e.target.files[0])}
        ></Input>
        <Button onClick={uploadImage}>Upload</Button>
        <img src={pic} width="100%" />
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addUserDetails()}
        >
          Add User
        </Button>
      </FormControl>

      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          All Fields are Required!
        </Alert>
      </Snackbar>
      {/* 
      <Snackbar
      open={openSuccess}
      autoHideDuration={6000}
      onClose={handleCloseSuccess}
      >
      <Alert
          onClose={handleCloseSuccess}
          severity="sucess"
          sx={{ width: "100%" }}
          >
          User Added Successfully!
          </Alert>
        </Snackbar> */}
    </Container>
  );
};

export default AddUser;
