import {useEffect,useState} from 'react'
import {Typography,Box,makeStyles,Grid,TextField,Button} from '@material-ui/core'
import {deepPurple,green,orange} from '@material-ui/core/colors';

import {Link} from 'react-router-dom';
import List from '../Component/List';
import axios from 'axios';
import { func } from 'prop-types';
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
function Home() {
    const classes=useStyles();
    const [student,setStudent]=useState({
        stuname:"",
        email:""
    });//is variable pr is function ka use krkey kaam krtn hn
    const [status,setStatus]=useState();
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
                await axios.post(`http://localhost:3333/students`,student);
                setStatus(true);
                //console.log(student.data);
            }catch(error){ 
                //console.log('something is wrong');
            }
     
    }
    //second approch but not usable
    // function onTextFieldChange(e){
    //     setStudent({
    //     'stuname':e.target.stuname

    //     })
    // }
    if(status){
        return <Home/>
    }
    return (
        <>
            <Box textAlign="center" className={classes.headingColor} p={2}>
                <Typography variant="h2">
                    School 
            </Typography>
            </Box>
            <Grid container justify="center" spacing="4">
           
                <Grid item md={6} xs={12}>
                <Box m={3}>
                    <Box textAlign="center" p={2} className={classes.addStuColor}>
                    <Typography variant="h6">Add Student</Typography>
                    </Box>
                    <form noValidate>
                    <Box m={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={e=>onTextFieldChange(e)} autoComplete="stuname" name="stuname" variant="outlined" required fullWidth id="name" label="Name" autoFocus></TextField>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={e=>onTextFieldChange(e)} autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" autoFocus></TextField>

                            </Grid>
                        </Grid>
                        </Box>
                        <Box m={3}>
                            <Button onClick={e=>onFormSubmit(e)} type="submit" variant="contained" color="primary" fullWidth>Add</Button>
                        </Box>
                    </form>
                    </Box>
                </Grid>
                
                <Grid item md={6} xs={12}>
                <Box m={3}>
                        <List></List>
                        </Box>
                       
                </Grid>
            </Grid>
           
        </>
        
    )
}

export default Home
