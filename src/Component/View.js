import {useEffect,useState} from 'react';
import {Button,Typography,Box,makeStyles,TableContainer,Table,TableBody,TableCell,TableHead,TableRow,Paper,IconButton,Tooltip} from '@material-ui/core'
import {deepPurple,green,orange} from '@material-ui/core/colors';
import {useParams,useHistory} from 'react-router-dom';
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
})
function View() {
    const classes=useStyles();
    const {id}=useParams();
    const [student,setStudent]=useState([]);
    const history=useHistory();
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
 
    console.log(id)
    function handleClick(){
        history.push('/');
    }
    return (
        <>
             <Box textAlign="center" p={2} className={classes.stuListColor}>
                    <Typography variant="h6">Student List</Typography>
                    </Box>
                   <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow style={{backgroundColor:"#616161"}}>
                                    <TableCell align="center" className={classes.tableHeadCell}>No</TableCell>
                                    <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
                                    <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
                                   
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">{student.id}</TableCell>
                                    <TableCell align="center">{student.stuname}</TableCell>
                                    <TableCell align="center">{student.email}</TableCell>
                                  
                                </TableRow>
                            </TableBody>
                        </Table>
                   </TableContainer>
                   <Box m={3} text-align="center">
                       <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
                   </Box>
        </>
    )
}

export default View
