import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import swal from "sweetalert";
import { host } from "../../ConfigurText";
import Header from "../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [imageUrl, setImageUrl] = useState(null);

  const handleFormSubmit = (values, { resetForm }) => {
    values.image = imageUrl;

    fetch(`${host}/citizens`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "success") {
          swal(
            "ধন্যবাদ!",
            ` ${values?.nameBn} নাগরিক হিসেবে  সিস্টেমে যুক্ত হয়েছে`,
            "success"
          );
          resetForm({ values: "" });
          setImageUrl(null);
        } else {
          swal("দুঃখিত!", `  ${data.msg}  `, "warning");
        }
      });
  };

  const uploadImage = (e) => {
    e.preventDefault();
    const image = e.target.files[0];

    const imageData = new FormData();
    imageData.append("avatar", image);

    axios
      .post(`${host}/uploadphoto`, imageData)
      .then((res) => {
        const imgUrl = `${host}/${res.data}`;
        setImageUrl(imgUrl);
      })
      .catch((err) => {});
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              {imageUrl ? (
                <img
                  style={{ height: "100px" }}
                  src={imageUrl}
                  srcSet=""
                  alt=""
                />
              ) : (
                <input onChange={uploadImage} type="file" />
              )}
            </Box>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="বাংলায় নাম"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nameBn}
                name="nameBn"
                error={!!touched.nameBn && !!errors.nameBn}
                helperText={touched.nameBn && errors.nameBn}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name in English"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Father Name Bn"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.father}
                name="father"
                error={!!touched.father && !!errors.father}
                helperText={touched.father && errors.father}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mother Name Bn"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mother}
                name="mother"
                error={!!touched.mother && !!errors.mother}
                helperText={touched.mother && errors.mother}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="NID Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nid}
                name="nid"
                error={!!touched.nid && !!errors.nid}
                helperText={touched.nid && errors.nid}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date Of Birth"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dob}
                name="dob"
                error={!!touched.dob && !!errors.dob}
                helperText={touched.dob && errors.dob}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Village"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.village}
                name="village"
                error={!!touched.village && !!errors.village}
                helperText={touched.village && errors.village}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Holding"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.holding}
                name="holding"
                error={!!touched.holding && !!errors.holding}
                helperText={touched.holding && errors.holding}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="HoldingNo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.holdingNo}
                name="holdingNo"
                error={!!touched.holdingNo && !!errors.holdingNo}
                helperText={touched.holdingNo && errors.holdingNo}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Tax Ammount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.taxAmmount}
                name="taxAmmount"
                error={!!touched.taxAmmount && !!errors.taxAmmount}
                helperText={touched.taxAmmount && errors.taxAmmount}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="House"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.house}
                name="house"
                error={!!touched.house && !!errors.house}
                helperText={touched.house && errors.house}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Family Member"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.familyMember}
                name="familyMember"
                error={!!touched.familyMember && !!errors.familyMember}
                helperText={touched.familyMember && errors.familyMember}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const initialValues = {
  name: "",
  nameBn: "",
  father: "",
  mother: "",
  nid: "",
  dob: "",
  village: "",
  holding: "",
  holdingNo: 0,
  taxAmmount: 0,
  house: "",
  email: "",
  contact: "",
  familyMember: "",
};

export default Form;
