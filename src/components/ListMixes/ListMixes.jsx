import { Box } from "@material-ui/core";
import React from "react";
import { useEffect , useState ,useCallback} from "react";
import { useDispatch ,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { getListDetails , mixListData,
   getListMixes ,setMixNumber
  ,emptyMixesOfInf,emptyMixesListDetail,
  emptyMixesDetail    ,addMixInfluencers,
  mixInfConData ,contentAddInMixInfluencerData } from "../../redux/listMixesSlice";
import {getContentInfData } from '../../new_api/api'

import ListMixTabs from "../ListMixTabs/ListMixTabs";

export default function ListMixes() {
  const { mutateAsync:getContentDataInf, isLoading:isLoadingContentInf } = useMutation(getContentInfData);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [activeMixTab , setActiveMixTab] = useState(1);
  const [contentDataBool,setContentData] = useState(false);
  const [counter,setcounter] = useState(0);
  useEffect(()=>{
    /** first we are remove the all influencers of the mixes */
    
   // dispatch(emptyMixesDetail({mixNumber:0}));dispatch(emptyMixesDetail({mixNumber:1}));
   // dispatch(emptyMixesDetail({mixNumber:2}));dispatch(emptyMixesDetail({mixNumber:3}));
   // dispatch(emptyMixesDetail({mixNumber:4}));
   
    dispatch(emptyMixesOfInf({mixNumber:1}));dispatch(emptyMixesOfInf({mixNumber:2}));
    dispatch(emptyMixesOfInf({mixNumber:3}));dispatch(emptyMixesOfInf({mixNumber:4}));
    dispatch(emptyMixesOfInf({mixNumber:5}));
    dispatch(emptyMixesListDetail({mixNumber:1}));dispatch(emptyMixesListDetail({mixNumber:2}));
    dispatch(emptyMixesListDetail({mixNumber:3}));dispatch(emptyMixesListDetail({mixNumber:4}));
    dispatch(emptyMixesListDetail({mixNumber:5}));
  },[dispatch]);

  /////////////////////////////////////// First Step ////////////////////////////////////
  /////////// Get the all mixes from the server and store in redux //////////////////////
  const influencers = useSelector((state) => state.filterResultData.influencers.influencers);
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const MixInfIds = useSelector((state) => state.listMixesData.mixListDetails);
  const listMixesAvl = useSelector((state) => state.listMixesData.mixDetails);
  const mixInfData = useSelector((state)=> state.listMixesData.mixInflencerData)
  const selectMixNumber = useSelector((state)=>state.filterResultData.selectedMix); 
  const [insertMixData , setMixInsertData] = useState(false);
  const [insertMixInfData , setInsertMixInfData] = useState(false);
  useEffect(()=>{
    dispatch(getListMixes(pitchInfo.project_id));
  },[dispatch , pitchInfo.project_id])

  ////////////////////////////////////// Second step ////////////////////////////////////
  //////////// Check in mix id in redux if any mix id present then state will change ////
  useEffect(()=>{
    if(listMixesAvl[0].id === 0 && listMixesAvl[1].id === 0 && listMixesAvl[2].id === 0
       && listMixesAvl[3].id === 0 && listMixesAvl[4].id === 0
       ){
         setMixInsertData(false);
       }else{
         setMixInsertData(true);
       }
   },[listMixesAvl]);

  /////////////////////////////////////// Third step //////////////////////////////////////
  ////// Get the influencer list by mix id on live server then store in redux /////////////
  useEffect(()=>{
    /** Get the influencers list which ara store in the mixes on live server */
    if(insertMixData){
      dispatch(mixListData({mixid:listMixesAvl[0].id,mixnum:listMixesAvl[0].mix_number}))
      dispatch(mixListData({mixid:listMixesAvl[1].id,mixnum:listMixesAvl[1].mix_number}))
      dispatch(mixListData({mixid:listMixesAvl[2].id,mixnum:listMixesAvl[2].mix_number}))
      dispatch(mixListData({mixid:listMixesAvl[3].id,mixnum:listMixesAvl[3].mix_number})) 
      dispatch(mixListData({mixid:listMixesAvl[4].id,mixnum:listMixesAvl[4].mix_number}))  
      /** When this value true then below another useEffect call it */
      setTimeout(() => {
        setInsertMixInfData(true);
      }, 100);
    }
  },[insertMixData])

   ///////////////////////////////////// Fourth Step /////////////////////////////////////
  ////////// Get the influencer details in the influencers data which are store in redux
  ////////// and add mix data then return the data ////////////////////////////////////
  const returnMixInfList = (mixListId , influencers , mixNumber) =>  {
    if (mixListId.length !== 0 && influencers.length !== 0) {
      //const list_inf = influencers.filter((out)=>{
      //      return mixListId.some((fil)=>{
      //        return fil.influencer_id === out.id;
      //      })
      //})
      //var inf_data_list = [...list_inf];
      var obj = [];
      for (var i = 0; i < mixListId.length; i++) {
        //if(inf_data_list[i].userid === mixListId[i].userid){
            var creat_data = {...mixListId[i] , mixdata:{...mixListId[i]} ,content_plan:[] };
            obj.push(creat_data);
         // }
        }
      const list_Mix_influ = {"data":obj , "mixNum":mixNumber};
      return list_Mix_influ;
   }
   return {"data":[] , "mixNum":mixNumber};
  }
   
  /////////////////////////// create a content data  /////////////////////////////////////////

  const infContentDataGet  =  useCallback((MixInfIds) =>  {
    for (let i = 0; i < 5; i++) {
          const Mix_list_inf_Numbers = MixInfIds[`influencers_data_list_${i+1}`];
          for (let j = 0; j < Mix_list_inf_Numbers.length; j++) {
            setTimeout(()=>{
              let mixInfIdsGet = Mix_list_inf_Numbers[j];
              getContentDataInf({mixInfId:mixInfIdsGet.id,mixnum:i+1}).then((res)=>{
                if(res.mainData.length>0){
                  dispatch(contentAddInMixInfluencerData(res));
                }
              });
            },1000*j)
          }      
    } 
  },[])


  ////////////////////////////////////////// Fifth Step //////////////////////////////////////
  /////////////////// Here we are add the influencer data in the Redux ///////////////////////
  useEffect(()=>{
    if(insertMixInfData){
       const Mix_list_inf_1 = MixInfIds.influencers_data_list_1;//This are store the influencers id
       const Mix_list_inf_2 = MixInfIds.influencers_data_list_2;
       const Mix_list_inf_3 = MixInfIds.influencers_data_list_3;
       const Mix_list_inf_4 = MixInfIds.influencers_data_list_4;
       const Mix_list_inf_5 = MixInfIds.influencers_data_list_5;
       const listMixOne = returnMixInfList(Mix_list_inf_1 ,influencers , 1 );
       const listMixtwo = returnMixInfList(Mix_list_inf_2 ,influencers , 2 );
       const listMixThr = returnMixInfList(Mix_list_inf_3 ,influencers , 3 );
       const listMixFou = returnMixInfList(Mix_list_inf_4 ,influencers , 4 );
       const listMixFiv = returnMixInfList(Mix_list_inf_5 ,influencers , 5 );
       dispatch(addMixInfluencers(listMixOne));
       dispatch(addMixInfluencers(listMixtwo));
       dispatch(addMixInfluencers(listMixThr));
       dispatch(addMixInfluencers(listMixFou));
       dispatch(addMixInfluencers(listMixFiv));
       setTimeout(()=>{
         setContentData(true);
       },1000)
       
    }

 },[insertMixInfData , MixInfIds ,influencers])

 useEffect(()=>{
   if(contentDataBool){
     infContentDataGet(MixInfIds);
     console.log("ListMixes",counter);
     setcounter(counter+1);
    }
 },[contentDataBool ,MixInfIds ])




  useEffect(() => {
    /** Here in dispatch we are call the api which are get the list details */
    //dispatch(getListDetails(id));
    
  }, [dispatch, id]);
  
  return (
    <Box>
      <ListMixTabs />
    </Box>
  );
}
