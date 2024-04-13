import React from 'react'
import { useFormik } from 'formik'
import { FileParser } from '../utils/Fileparser';
// validation
import * as Yup from 'yup'

function FormComponent() {

    const KB = 1024;
    const MB = KB * 1024;
    const VALID_TYPE = ['image/png', 'image/jpg', 'image/jpeg'];

    const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name]

    const formik = useFormik({
      // initial values
      initialValues: {
        fname: "",
        lname: "",
        email: "",
        password: "",
        gender: "",
        image: "",
        bdate: "",
      },

      // validation YUP
      validationSchema: Yup.object({
        fname: Yup.string().required("First name is required!!"),
        lname: Yup.string().required("Last name is required!!"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
        gender: Yup.string().required("Gender is required"),
        image: Yup.mixed()
          .required("Image is required")
          .test(
            "fileSize",
            "Wrong file size, must be under 2MB",
            (value) => value.size < MB * 2
          )
          .test("fileType", "Wrong file type", (value) =>
            VALID_TYPE.includes(value.type)
          ),
        bdate: Yup.date().required("Birth date is required"),
      }),

      // on submit
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));

        if (values.image) {
          FileParser(values.image)
            .then((res) => {
              // object image:string
              console.log({ ...values, image: res });
            })
            .catch((err) => console.log(err));
        }

        //reset form
        formik.resetForm();
      },
    });


    return (
        <form onSubmit={formik.handleSubmit} action="" className='flex flex-col gap-2'>
            {/* first name */}
            <label htmlFor="fname">First name:<span className='text-2 text-firebrick ml-2 '>{showError('fname')}</span></label>
            <input 
                type='text' 
                id='fname' 
                name='fname'
                placeholder='Insert first name*'
                onChange={formik.handleChange}
                value={formik.values.fname}
                className='py-2 px-7 outline-none rounded-md'
            />

            {/* last name */}
            <label htmlFor='lname'>Last name: <span className='text-2 text-firebrick ml-2 '>{showError('lname')}</span></label>
            <input 
                type='text' 
                id='lname' 
                name='lname'
                placeholder='Insert last name*'
                onChange={formik.handleChange}
                value={formik.values.lname}
                className='py-2 px-7 outline-none rounded-md'
            />
            
            {/* email */}
            <label htmlFor="email">Email:<span className='text-2 text-firebrick ml-2 '>{showError('email')}</span></label>
            <input 
                type='email' 
                id='email' 
                name='email'
                placeholder='Insert email*'
                onChange={formik.handleChange}
                value={formik.values.email}
                className='py-2 px-7 outline-none rounded-md'
            />

            {/* password */}
            <label htmlFor="password">Password:<span className='text-2 text-firebrick ml-2 '>{showError('password')}</span></label>
            <input 
                type='password' 
                id='password' 
                name='password'
                placeholder='Insert password*'
                onChange={formik.handleChange}
                value={formik.values.password}
                className='py-2 px-7 outline-none rounded-md'
            />

            {/* gender */}
            <label htmlFor="gender">Gender<span className='text-2 text-firebrick ml-2 '>{showError('gender')}</span></label>
            <select 
                name="gender" 
                id="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                className='py-2 px-4 outline-none rounded-md'
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            {/* image */}
            <label htmlFor="image">Image<span className='text-2 text-firebrick ml-2 '>{showError('image')}</span></label>
            <input 
                type="file"
                id='image'
                name='image'
                onChange={(e) => 
                formik.setFieldValue(e.target.name, e.target.files[0])
                }
                className='py-2 px-4 outline-none rounded-md' 
            />

            {/* birth date */}
            <label htmlFor="bdate">Birth date: <span className='text-2 text-firebrick ml-2 '>{showError('bdate')}</span></label>
            <input 
                type='date' 
                id='bdate' 
                name='bdate'
                onChange={formik.handleChange}
                value={formik.values.bdate}
                className='py-2 px-7 outline-none rounded-md'
            />

            <button type='submit' className='py-2 px-7 my-2 block bg-tomato hover:bg-firebrick hover:text-ghostwhite rounded-md ' >Sign Up</button>
        </form>
    )
}

export default FormComponent
