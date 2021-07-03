import {useState,useEffect} from 'react';
import {Typography,Box,makeStyles,Grid,TextField,Button} from '@material-ui/core'
import {deepPurple,green,orange} from '@material-ui/core/colors';

import {useHistory,useParams} from 'react-router-dom';
import List from '../Component/List';
import axios from 'axios';
const useStyles=makeStyles({
    headingColor:{
        backgroundColor:deepPurple[400],
        color:"white"
    },
    addStuColor:{
        backgroundColor:green[400],
        color:"white"
    },
    stuListColor:{
        backgroundColor:orange[400],
        color:"white"
    }
    ,tableHeadCell:{
        color:"white",
        fontWeight:"bold",
        fontSize:16
    }
})
function Edit() {
    const classes=useStyles();
    const {id}=useParams();
    const history =useHistory();
    const [student,setStudent]=useState({
        stuname:"",
        email:""
    });
    useEffect(()=>{
        async function getStudent(){
            try{
                const student =await axios.get(`http://localhost:3333/students/${id}`);
                //console.log(student.data);
                setStudent(student.data);
            }catch(error){ 
                //console.log('something is wrong');
            }
        }
        getStudent();
    },[id])
    function onTextFieldChange(e){
        setStudent({
            ...student,
        [e.target.name]:e.target.value
           
        })
        console.log(student)
    }
    async function onFormSubmit(e){
        e.preventDefault();
       
            try{
                await axios.put(`http://localhost:3333/students/${id}`,student);
                history.push('/');
                //console.log(student.data);
            }catch(error){ 
                //console.log('something is wrong');
            }
     
    }
    function handleClick(){
        history.push('/');
    }
    return (
        <div>
            <Box textAlign="center" className={classes.headingColor} p={2}>
                <Typography variant="h2">
                    School 
            </Typography>
            </Box>
            <Grid container justify="center" spacing="4">
           
                <Grid item xs={12}>
                <Box m={3}>
                    <Box textAlign="center" p={2} className={classes.addStuColor}>
                    <Typography variant="h6">Edit Student</Typography>
                    </Box>
                    <form noValidate>
                    <Box m={3}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                                <TextField  autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="id" autoFocus disabled value={id}></TextField>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={e=>onTextFieldChange(e)} autoComplete="stuname" name="stuname" variant="outlined" required fullWidth id="name" label="Name" autoFocus value={student.stuname}></TextField>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={e=>onTextFieldChange(e)} autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address"  value={student.email}></TextField>

                            </Grid>
                        </Grid>
                        </Box>
                        <Box m={3}>
                            <Button onClick={e=>onFormSubmit(e)}type="submit" variant="contained" color="primary" fullWidth>Update</Button>
                        </Box>
                        <Box m={3} text-align="center">
                       <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
                   </Box>
                    </form>
                    </Box>
                </Grid>
                
             
            </Grid>
           
        </div>
        
    )
}

export default Edit
