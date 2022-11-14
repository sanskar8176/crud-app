import { useState, useEffect } from "react";

import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers, editUser } from "../Service/api";

const initialValue = {
  name: "",
  username: "",
  email: "",
  phone: "",
  pic: ""
};

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;

const EditUser = () => {
  const [user, setUser] = useState(initialValue);
  const { name, username, email, phone, pic } = user;
  const { id } = useParams();
  const [image, setImage] = useState("");


  let navigate = useNavigate();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getUsers(id);
    setUser(response.data);
  };

  const editUserDetails = async () => {
    const response = await editUser(id, user);
    navigate("/");
  };

  const onValueChange = (e) => {
    // console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //  for image upload
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
        setUser({ ...user, pic: data.url.toString() });
      })
      .catch((err) => console.log(err));
  };


  return (
    <Container injectFirst>
      <Typography variant="h4">Edit Information</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="name"
          value={name}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Username</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="username"
          value={username}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Email</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="email"
          value={email}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Phone</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="phone"
          value={phone}
          id="my-input"
          aria-describedby="my-helper-text"
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
          onClick={() => editUserDetails()}
        >
          Edit User
        </Button>
      </FormControl>
    </Container>
  );
};

export default EditUser;
