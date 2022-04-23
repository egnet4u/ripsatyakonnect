import React , {useState} from 'react'
import { Grid ,TextField,MenuItem ,Button ,Checkbox ,Box ,Tooltip ,IconButton,CircularProgress, Typography, makeStyles } from "@material-ui/core"
import AddUserPopUP from "../../components/AddUserPopUP/AddUserPopUP";
import UserPasswordChangePopup  from "../../components/UserPasswordChangePopup/UserPasswordChangePopup";
import { useDispatch } from 'react-redux';
import {setRoleAndBLockedStatus ,deleteUserInRedux}  from "../../redux/allUsersSlice"
import {addRoleOfUsers ,addBlockStatusOfUser ,deleteUserData} from "../../new_api/api";
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

const useStyle = makeStyles((theme)=>({
   userDataRow:{
       borderBottom:"1px solid #efefef ",
       paddingTop:"5px !important",
       paddingBottom:"5px !important"

   },
   userDataDetails:{
       fontSize:"14px !important",
       paddingLeft:"3px",
       paddingRight:"3px",
   },
   button:{
     marginRight:"4px",
     marginTop:"5px",
   },

}))

export default function ShowUsersList({uData}) {
    const dispatch = useDispatch();
    const {mutateAsync:saveRoleStatus , isLoading:SaveRoleStatusIsLoading} = useMutation(addRoleOfUsers);
    const {mutateAsync:saveBlockedStatus , isLoading:saveBlockedStatusIsloading} = useMutation(addBlockStatusOfUser);
    const {mutateAsync:deleteOfUser , isLoading:deleteOfUserIsLoading} = useMutation(deleteUserData);
    
    const findUnderScoreIndex = uData.role.indexOf("_");
    const capitalize = (str) =>  str.charAt(0).toUpperCase() + str.slice(1) ;
    const lowercase = (str) => str.toLowerCase();
    const rolesOfUser = findUnderScoreIndex !== -1 ? uData.role.replace("_"," ").split(' ').map(capitalize).join(' ') : uData.role.charAt(0).toUpperCase() + uData.role.slice(1);
    const classes = useStyle();
    const roles = ["Super Admin" , "Management Admin" , "Community Admin","Intern" , "Brand"];
    const [userRole , setUserRole] = useState(rolesOfUser);
    const [newPassword , setPasswordNew] = useState(false);
    const [blockedStatus , setBlockedStatus] = useState(uData.blocked);
    const userRoleChange = async (e)=>{
        setUserRole(e.target.value);
        const roleValue = e.target.value;
        const trimRole = roleValue.trim();
        const findSpaceIndex = trimRole.indexOf(" ");
        const realRoleData = findSpaceIndex !== -1 ? trimRole.split(" ").map(lowercase).join('_') : trimRole.toLowerCase() ;
        await dispatch(setRoleAndBLockedStatus({name:e.target.name , uid:uData.id , value:realRoleData}))
    }
    
    //Password popup are show
    const showPasswordPopup = () =>{
        setPasswordNew(true);
    }
    // Password popup are hide
    const hidePasswordPopup  = () =>{
        setPasswordNew(false);
    }
    
    //When click on the blocked checkBox button
    const userBlocked = (e) => {
     setBlockedStatus(!blockedStatus);  
     dispatch(setRoleAndBLockedStatus({name:e.target.name , uid:uData.id , value:!blockedStatus }))
    }
    // When click on the save button
    const saveUserData = () =>{
        //This API save The Role Of User
        // saveRoleStatus({ user_id:uData.id,role:uData.role}).then((res)=>{
        //   if(res.status){
        //       toast.success("User Data Update SuccessFully");
        //   }else{
        //       toast.error("Something is Wrong In Response");
        //   }
        // }).catch((error)=>{
        //     toast.error("Something is Wrong");
        // })
        //This api save the role of user
        saveBlockedStatus({user_id:uData.id,blocked:uData.blocked,role:uData.role}).then((res)=>{
            if(res.status){
                toast.success("User Data Update SuccessFully");
            }else{
                toast.error("Something is Wrong In Response");
            }
          }).catch((error)=>{
            toast.error("Something is wrong in blocked api");
        })
    }
 
    const deleteUser = () =>{
        const conformMation = window.confirm(`Are you sure you want to delete ${uData.username} user `);
        if(!conformMation){
            return;
        }
        deleteOfUser({user_id:uData.id}).then((res)=>{
           if(res.status){
               toast.success(res.message);
               dispatch(deleteUserInRedux({user_id:uData.id}));
           }else{
               toast.error(res.message);;
           }
        }).catch((error)=>{
            toast.error("Something is Wrong");
        })
    }
    
    const changePassword = () =>{
        alert("Change Password");
    }
  return (
    <>
        <Grid 
            container 
            justify="space-between" 
            alignItems="center" 
            className={classes.userDataRow}
            //style={{marginTop:"50px"}}
        >
            <Grid  item xs={2}>
                <Typography 
                    className={classes.userDataDetails} 
                    variant="body1" 
                    style={{wordWrap:"break-word"}}
                >
                    {uData.username}
                </Typography>
            </Grid>
            <Grid item xs={2} >
                <Typography 
                className={classes.userDataDetails} 
                variant="body1" 
                style={{wordWrap:"break-word"}}
                >
                {uData.email}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Checkbox
                checked={blockedStatus}
                onChange={userBlocked}
                name="blockAction"
                color="primary"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField 
                    style={{"width":"75%"}}
                    id="standard-select-role"
                    select
                    value={userRole}
                    variant= "outlined"
                    onChange={userRoleChange}
                    size="small"
                    name="role"
                            
                >
                    {roles.map((option,index) => (
                        <MenuItem key={`${option}_${index}`} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={3}>
            <Button
                    className={classes.button}
                    onClick={saveUserData}
                    size="small"
                    variant="contained" 
                    color="primary"
                    disabled={SaveRoleStatusIsLoading || saveBlockedStatusIsloading}
                >
                    Save {" "}
                    {(SaveRoleStatusIsLoading || saveBlockedStatusIsloading )&&
                      <CircularProgress
                        color="secondary"
                        style={{ marginLeft: "0.3rem" }}
                        size={13}
                      />
                    }
                </Button>
                <Button
                    className={classes.button}
                    onClick={deleteUser}
                    disabled={deleteOfUserIsLoading}
                    color="secondary"
                    size="small"
                    variant="contained" 
                    
                >
                    Delete 
                    { deleteOfUserIsLoading && 
                      <CircularProgress
                        color="secondary"
                        style={{ marginLeft: "0.3rem" }}
                        size={13}
                      /> }
                </Button>
                <Button
                    className={classes.button}
                    onClick={showPasswordPopup}
                    color="info"
                    size="small"
                    variant="contained" 
                    
                >
                   Change Password
                </Button>
            </Grid>
        </Grid>
        { newPassword && (
          <UserPasswordChangePopup 
          showHide ={newPassword}
          setShowHide = {hidePasswordPopup}
          userData = {uData}
          />
        )}
    </>
    
  )
}

