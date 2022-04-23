import { Grid , Button ,Checkbox ,Box ,Tooltip ,IconButton,CircularProgress, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import React ,{useState ,Suspense} from 'react';
import CommonHead from "../../components/CommonHead/CommonHead";
import CommonBox from "../../components/CommonBox/CommonBox";
import AddUserPopUP from "../../components/AddUserPopUP/AddUserPopUP";
import ShowUsersList from "../../components/ShowUsersList/ShowUsersList";
import { useSelector } from "react-redux";
const useStyle =  makeStyles((theme)=>({
    tabsContainer: {
        padding: `0 20px`,
        [theme.breakpoints.up("sm")]: {
            padding: `0 40px`,
        },
    },
    tabs: {},
    tab: {
        color: "#624e9a",
        fontFamily: "Poppins",
        fontSize: "12px",
        fontWeight: 500,
    },
    button: {
        fontSize: "12px",
    },
    create: {
        position: "absolute",
        right: 30,
        top: 85,
    },
    plus: {
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.06)",
        padding: "2px",
        background: "#ffffff",
        borderRadius: "50%",
        fontSize: "30px",
        color: "#2e75bb",
    },
    mainContainer:{
        width:"100%",
        height:"100%",
        backgroundColor:"#ffffff",
        paddingTop:"10px",
        paddingBottom:"10px",
        borderTop:"1px solid #efefef",
        padding:"10px",
        
    },
    listHeader: {
        borderRadius: "0px",
        background: "#333333",
        padding: "10px 13px",
        borderTopRightRadius:"4px",
        borderTopLeftRadius:"4px",
    },
    newTabDesign:{
        color:"#ffffff",
    }

}))

export default function UserList(){
   const allUsersList = useSelector((state)=>state.allUsersData.users);
   const allUsersStatus = useSelector((state)=>state.allUsersData.status);
   const [showHide , setShowHide] = useState(false); 
   const  classes = useStyle();
   const addUserPopup = () =>{
     setShowHide(true);
   }
   const closePopUpHandle = ()  =>{
     setShowHide(false);
   }

   return(
        <>
           <div>
                <CommonHead title={"Add Users"}>
                            <div className={classes.create}>
                                <Tooltip title="Add User">
                                    <IconButton  component="span">
                                        <AddCircleIcon onClick={addUserPopup} className={classes.plus} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                </CommonHead>
                <Box className={classes.mainContainer} >
                 <Grid 
                 container 
                 justify="space-between" 
                 alignItems="center" 
                 className={classes.listHeader}
                 >
                    <Grid  item xs={2}>
                       <Typography 
                          className={classes.newTabDesign} 
                          variant="body1" 
                       >
                           Name
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                       <Typography 
                        className={classes.newTabDesign} 
                        variant="body1" 
                       >
                        Email Address
                       </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography 
                           className={classes.newTabDesign} 
                           variant="body1" 
                        >
                          Blocked
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography 
                           className={classes.newTabDesign} 
                           variant="body1" 
                        >
                          Roles
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography 
                           className={classes.newTabDesign} 
                           variant="body1" 
                        >
                          Actions
                        </Typography>
                    </Grid>
                 </Grid>
                 {  allUsersStatus &&
                     allUsersList.map((res)=>
                       <ShowUsersList 
                         uData = {res}
                       />
                     )
                 }
                 
                </Box>
           </div>
           {showHide && (
               <AddUserPopUP 
                  setShowHide={closePopUpHandle}
                  showHide={showHide}
               />
           )}
        </>
    )
}