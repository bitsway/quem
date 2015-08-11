
//online
var apipath="http://e2.businesssolutionapps.com/quem/syncmobile/";

//local
//var apipath="http://127.0.0.1:8000/quem/syncmobile/";


var plateNo="";	
		
var platePhoto="";
//transporter or Customer
var transOrCus="";

	
var trnCusName="";
var drMsName="";
var drMobileNo="";
var numOfBag="";
var party="";
var tokenNo="";
var trans_depot_id="";

var imageName = "";
var imagePathA="";

var deptCmboFlag=0;
var transCusVal="";
var partyVal="";


$(document).ready(function(){
		$("#wait_image_login").hide();
		$("#loginButton").show();		
		if ((localStorage.synced!='YES')){
			var url = "#login";
				
		}else{		
			$("#btn_take_pic").show();																		
			$("#btnTruckInfo").show();
									
			$("#wait_image_login").hide();
			$("#wait_image_parking_1_list").hide();
			$("#wait_image_to_queue_list").hide();
			$("#wait_image_parking_2_list").hide();
			
			
			
			$("#wait_image_search").hide();
			$('#tbl_show_all').hide();
			$("#trans_depot").hide();
			
			$("#wait_image_to_submit").hide();
			
			
			//------------------------------	
			$("#plateNo").val("");
			$("#platePhoto").val("");
			
			transCusVal="";	
			$( "input:radio[name='transCus'][value='"+transCusVal+"']" ).attr('checked','');
			
			$("#trnCusName").val("");
			$("#drMsName").val("");
			$("#mobileNo").val("");
			$("#numOfBag").val("");
			
			partyVal="";	
			$( "input:radio[name='party'][value='"+partyVal+"']" ).attr('checked','');
			
			
			$("#tokenNo").val("");
			
			$("#btn_take_pic").show();
			
			if (deptCmboFlag==0){
				$("#depotCmboDiv").html(localStorage.depotList);	
				deptCmboFlag=1;
			}else{
				$('#depotCmboDiv').empty();
				$('#depotCmboDiv').append(localStorage.depotList).trigger('create');
			}
			
			if (localStorage.outerPark=="NO"){
				$("#btnParking1").hide();
				$("#btnQueue").hide();
				$("#btnParking2").hide();
				}
			
			var url = "#pageHome";
		}
		
		$.mobile.navigate(url);
		
	});

function menuClick(){
	
	$.mobile.navigate("#pageHome");
	location.reload();
	
}



function get_login() {
	var url = "#login";
	$.mobile.navigate(url);
	}
				
//========================= Longin: Check user
function check_user() {
	var user_id=$("#user_id").val().toUpperCase();
	var user_pass=$("#user_pass").val();
	
	var base_url='';
	var photo_url='';
	
	//-----
	if (user_id=="" || user_id==undefined || user_pass=="" || user_pass==undefined){
		var url = "#login";      
		$.mobile.navigate(url);
		$("#error_login").html("Required User ID and Password");	
	}else{
		//-----------------
					
			if(localStorage.sync_code==undefined || localStorage.sync_code==""){
				localStorage.sync_code=0
			}
			
			//alert(apipath+'passwordCheck?cid=LAFARGE&mobile='+user_id+'&password='+encodeURIComponent(user_pass)+'&sync_code='+localStorage.sync_code);
										
			$.ajax({
					 type: 'POST',
					 url: apipath+'passwordCheck?cid=LAFARGE&mobile='+user_id+'&password='+encodeURIComponent(user_pass)+'&sync_code='+localStorage.sync_code,
					 success: function(result) {											
							if (result==''){
								$("#wait_image_login").hide();
								$("#loginButton").show();
								$("#error_login").html('Sorry Network not available');
								
							}else{
								syncResult=result
																
								var syncResultArray = syncResult.split('rdrd');
								if (syncResultArray[0]=='YES'){													
									localStorage.synced=syncResultArray[0];														
									localStorage.sync_code=syncResultArray[1];
									localStorage.depotList=syncResultArray[2];
									localStorage.outerPark=syncResultArray[3];
															
									localStorage.mobile_no=user_id;
									
									if (deptCmboFlag==0){
										$("#depotCmboDiv").html(localStorage.depotList);	
										deptCmboFlag=1;
									}else{
										$('#depotCmboDiv').empty();
										$('#depotCmboDiv').append(localStorage.depotList).trigger('create');
									}
									
									if (localStorage.outerPark=="NO"){
										$("#btnParking1").hide();
										$("#btnQueue").hide();
										$("#btnParking2").hide();
									}else{
										$("#btnParking1").show();
										$("#btnQueue").show();
										$("#btnParking2").show();
										}
									
									$("#depotCmboDiv").html(localStorage.depotList);
									
									$("#error_login").html('');
									$("#wait_image_login").hide();
									$("#loginButton").show();
									
									//-------------------
									$("#plateNo").val("");
		
									transCusVal="";	
									$( "input:radio[name='transCus'][value='"+transCusVal+"']" ).attr('checked','');
									
									$("#trnCusName").val("");
									$("#drMsName").val("");
									$("#mobileNo").val("");
									$("#numOfBag").val("");
									
									partyVal="";	
									$( "input:radio[name='party'][value='"+partyVal+"']" ).attr('checked','');
									
									$("#tokenNo").val("");
									
									
									//----------------
									
									var url = "#pageHome";
									$.mobile.navigate(url);								
									
									$(".errorChk").html("Sync Successful");
									//alert('aa');
			
								}else {
									
									$("#wait_image_login").hide();
									$("#loginButton").show();
									//$("#error_login").html('Server Error');													
									
									$("#error_login").html("Sync Failed. Authorization or Network Error.");
									//$('#syncBasic').show();
								}
													
								
							}
						  },
					  error: function(result) {					 
						  $("#wait_image_login").hide();
						  $("#loginButton").show();
						  $("#error_login").html('Invalid Request');
						  
						  var url = "#login";
						  $.mobile.navigate(url);	
					  }
				  });//end ajax
				}//base url check
						
						//-------------		
					
	}//function



function newEntry(){
		if(localStorage.sync_code==undefined || localStorage.sync_code==""){
			$(".errorChk").text("Required Sync");
		}else{	
			$("#trans_depot").hide();
			$("#success_msg").text("");
			$("#wait_image_to_submit").hide();
			
			$("#btnTruckInfo").show();
				
			$("#err_truck_info").text("");
			
			$("#plateNo").val("");
			
			$("#platePhoto").val("");
			
			
			
			$("#trnCusName").val("");
			$("#drMsName").val("");
			$("#mobileNo").val("");
			$("#numOfBag").val("");
			
			transCusVal="";	
			$( "input:radio[name='transCus'][value='"+transCusVal+"']" ).attr('checked','');
			
			partyVal="";	
			$( "input:radio[name='party'][value='"+partyVal+"']" ).attr('checked','');
			
			$("#tokenNo").val("");
			
			if (deptCmboFlag==0){
				$("#depotCmboDiv").html(localStorage.depotList);	
				deptCmboFlag=1;
			}else{
				$('#depotCmboDiv').empty();
				$('#depotCmboDiv').append(localStorage.depotList).trigger('create');
			}
		
					
			var url = "#newEntryPage";
			$.mobile.navigate(url);
		}
	
}


function anotherEntry(){
		location.reload();
		
		newEntry()
	
	}


function chkParty(){	
	party=$("input[name='party']:checked").val();	
	if (party=="ST"){
		$("#trans_depot").show();
		
		if (deptCmboFlag==0){
			$("#depotCmboDiv").html(localStorage.depotList);	
			deptCmboFlag=1;
		}else{
			$('#depotCmboDiv').empty();
			$('#depotCmboDiv').append(localStorage.depotList).trigger('create');
		}
		
		
		
	}else{
		$('#depotCmboDiv').empty();
		$("#trans_depot").hide();
		
		}
	
	}


function truckInfoSubmit(){
		$("#btnTruckInfo").hide();
		$("#wait_image_to_submit").show();
		
		var d = new Date();	
		var get_time=d.getTime();	
		
		plateNo=$("#plateNo").val();	
		
		platePhoto=$("#platePhoto").val();
		
		//transporter or Customer
		transOrCus=$("input[name='transCus']:checked").val();
		
		
			
		trnCusName=$("#trnCusName").val();
		drMsName=$("#drMsName").val();
		drMobileNo=$("#mobileNo").val();
		numOfBag=$("#numOfBag").val();
		partyVal=$("input[name='party']:checked").val();
		tokenNo=$("#tokenNo").val();
		trans_depot_id=$("#tr_depot_id").val();
		
		
		if(party=="ST"){
			trans_depot_id=trans_depot_id;
		}else{
			trans_depot_id="-";
		}
		
		//latitude=$("#ach_lat").val();
		//longitude=$("#ach_long").val();
		
		
		
		/*if (latitude==undefined || latitude==''){
			latitude=0;
			}
		if (longitude==undefined || longitude==''){
			longitude=0;
			}*/
		
		if (platePhoto=='' || platePhoto==undefined){
			$("#err_truck_info").text("Please confirm Photo ");
			$("#wait_image_to_submit").hide();
			$("#btnTruckInfo").show();
		}else{
			if (plateNo=="" || plateNo==undefined){
			
				$("#err_truck_info").text("Required Plate No ");
				$("#wait_image_to_submit").hide();
				$("#btnTruckInfo").show();
			}else{
				if (transOrCus=="" || transOrCus==undefined){
		
					$("#err_truck_info").text("Required Transport Or Customer ");
					$("#wait_image_to_submit").hide();
					$("#btnTruckInfo").show();
				}else{
					if (trnCusName=="" || trnCusName==undefined){
		
						$("#err_truck_info").text("Required Transport or Customer name");
						$("#wait_image_to_submit").hide();
						$("#btnTruckInfo").show();
					}else{
						if (drMsName=="" || drMsName==undefined){
		
							$("#err_truck_info").text("Required Driver Name ");
							$("#wait_image_to_submit").hide();
							$("#btnTruckInfo").show();
						}else{
							if (drMobileNo=="" || drMobileNo==undefined){
		
								$("#err_truck_info").text("Required Driver Mobile No ");
								$("#wait_image_to_submit").hide();
								$("#btnTruckInfo").show();
							}else{
								if (numOfBag=="" || numOfBag==undefined){
		
									$("#err_truck_info").text("Required Capacity(Number of Bag) ");
									$("#wait_image_to_submit").hide();
									$("#btnTruckInfo").show();
								}else{
									if (partyVal=="" || partyVal==undefined){
		
										$("#err_truck_info").text("Required Party ");
										$("#wait_image_to_submit").hide();
										$("#btnTruckInfo").show();
									}else{											
										/*if(latitude==0 || longitude==0){
											$(".errorChk").text("Please confirm your location ");
											$("#btn_ach_submit").show();
										}else{				
											if (achPlanId==''){
												$(".errorChk").text("New records not available");
												$("#btn_ach_submit").show();
											}else{*/
												
												if (drMobileNo.length<11 || drMobileNo.length>13){
													$("#err_truck_info").text("Invalid Mobile no");
													$("#wait_image_to_submit").hide();
													$("#btnTruckInfo").show();
												}else{							
													if (drMobileNo.length==11){
														drMobileNo='88'+drMobileNo
														}
													
													if((party=="ST")&&(trans_depot_id=="")){
														$("#err_truck_info").text("Check Stock Transfer Depot.");
														$("#wait_image_to_submit").hide();
														$("#btnTruckInfo").show();
													}else{							
														//imagePathA="test"
														if (imagePathA!=""){								
															$("#err_truck_info").text("Syncing photo..");
															imageName = localStorage.mobile_no+"_"+get_time+".jpg";	
																			
															uploadPhotoTruckPlate(imagePathA, imageName);
														}
													}
												}
											}
										
										/*	}
										}*///end check location
								}
							}
						}
					}
				}
			}
										
		}//chk photo
	}

function syncDataTruckInfo(){	
			$("#wait_image_to_submit").show();
			
			//alert(apipath+'submitTruckInfo?cid=LAFARGE&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&plateNo='+encodeURIComponent(plateNo)+'&transOrCus='+transOrCus+'&trnCusName='+encodeURIComponent(trnCusName)+'&drMsName='+encodeURIComponent(drMsName)+'&drMobileNo='+drMobileNo+'&numOfBag='+numOfBag+'&party='+party+'&tokenNo='+tokenNo+'&plate_photo='+imageName+'&tr_depot_id='+trans_depot_id);
			
			$.ajax({
					type: 'POST',
					url:apipath+'submitTruckInfo?cid=LAFARGE&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&plateNo='+encodeURIComponent(plateNo)+'&transOrCus='+transOrCus+'&trnCusName='+encodeURIComponent(trnCusName)+'&drMsName='+encodeURIComponent(drMsName)+'&drMobileNo='+drMobileNo+'&numOfBag='+numOfBag+'&party='+party+'&tokenNo='+encodeURIComponent(tokenNo)+'&plate_photo='+imageName+'&tr_depot_id='+trans_depot_id,
					   
					   success: function(result) {
							//alert(result);
						if(result=='Success'){							
							//----------------
							$("#plateNo").val("");
							$("#platePhoto").val("");
							imagePathA="";
							
							transCusVal="";	
							$( "input:radio[name='transCus'][value='"+transCusVal+"']" ).attr('checked','');
							
							partyVal="";	
							$( "input:radio[name='party'][value='"+partyVal+"']" ).attr('checked','');
							
							$("#trnCusName").val("");
							$("#drMsName").val("");
							$("#mobileNo").val("");
							$("#numOfBag").val("");
							
														
							$("#tokenNo").val("");
														
							$("#success_msg").text('Successfully Submitted');
							$("#wait_image_to_submit").hide();
														
							var url="#successPage";
							$.mobile.navigate(url);
							
							
						}else if(result=='Failed1'){
							$("#err_truck_info").text('Plate No Not Available');									
							$("#btn_take_pic").show();																		
							$("#btnTruckInfo").show();
													
						}else{
							$("#err_truck_info").text('Unauthorized Access');
							//$(".errorChk").text('Try again after 5 minutes');
							$("#btn_take_pic").show();																		
							$("#btnTruckInfo").show();
							}
							
					   }//end result
			});//end ajax
	
	}



//Truck Info
function getTruckPalateImage() {		
	navigator.camera.getPicture(onSuccessA, onFailA, { quality: 10,
	destinationType: Camera.DestinationType.FILE_URI });		
}

function onSuccessA(imageURI) {		
    var image = document.getElementById('myImageA');
    image.src = imageURI;
	imagePathA = imageURI;	
	$("#platePhoto").val(imagePathA);
	
}

function onFailA(message) {
	imagePathA="";
    alert('Failed because: ' + message);
}


//------------------------------------------------------------------------------
//File upload 
function uploadPhotoTruckPlate(imageURI, imageName) {
	
	//winTruckInfo();
	
	var options = new FileUploadOptions();
    options.fileKey="upload";
    options.fileName=imageName;
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://i01.businesssolutionapps.com/que_image/quem_image_sync/fileUploader/"),winTruckInfo,onfail,options);
	
}



function winTruckInfo(r) {
//    console.log("Code = " + r.responseCode);
//    console.log("Response = " + r.response);
//    console.log("Sent = " + r.bytesSent);
	$("#err_truck_info").text('File upload Successful. Syncing Data...');
	syncDataTruckInfo();
}

function onfail(r) {
	$("#err_truck_info").text('File upload Failed. Syncing Data...');
	syncDataTruckInfo();
}



//------------------------parking

function parking1ListPage(){
	$('#tbl_show_parking_1').empty();
	
	//alert(apipath+'get_parking_list?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code); 
	
		$("#wait_image_parking_1_list").show();
			
		$.ajax({
				url:apipath+'get_parking_list?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code,
			  success: function(result) {						
						pr_1_list=result;
						
						if (pr_1_list!=""){
							pr_1_list_array=pr_1_list.split("rdrd");					
							
								for(i=0;i<pr_1_list_array.length;i++){
									pr_1_arrayStr=pr_1_list_array[i];
									
									pr_1_array=pr_1_arrayStr.split("fdfd");
									
									$('#tbl_show_parking_1').append('<tr onClick="recParking1Details(\''+pr_1_arrayStr+'\')" style="font-size:11px;"><td style="width:50%;" >'+pr_1_array[0]+'<br/><strong>'+pr_1_array[1]+'</strong></td><td style="width:50%;">'+pr_1_array[2]+'<br/>'+pr_1_array[3]+'</td></tr>');
								
								}
							$("#wait_image_parking_1_list").hide();
							$('#error_parking_1_list').text("");
							
						}
					
				}
			});	

	
	$("#wait_image_parking_1_list").hide();
	var url = "#page_parking_1_show";
	$.mobile.navigate(url);
	
}


function recParking1Details(recParking1Str){
		
		$("#btn_token").hide();
		
		park_1_array=recParking1Str.split("fdfd");		
		$('#ds_sl_no').text(park_1_array[0]);
		$('#ds_palat_no').text(park_1_array[1]);
		$('#ds_dr_name').text(park_1_array[2]);
		$('#ds_dr_mobile_no').text(park_1_array[3]);
		
		$('#ds_tr_cus').text(park_1_array[4]);
		$('#ds_tr_cus_name').text(park_1_array[5]);
		$('#ds_cap').text(park_1_array[6]);
		$('#ds_party').text(park_1_array[7]);
		$('#ds_token').text(park_1_array[8]);	
		
		var url = "#dialogRecDetails";
		$.mobile.navigate(url);
		
	}	

//--------------------- /parking


function queueListPage(){
	$('#tbl_show_to_queue').empty();
	
	//alert(apipath+'get_queue_list?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code); 
	
		$("#wait_image_to_queue_list").show();
			
		$.ajax({
				url:apipath+'get_queue_list?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code,
			  success: function(result) {					
						que_list=result;						
						if (que_list!=""){
							que_list_array=que_list.split("rdrd");					
							
								for(i=0;i<que_list_array.length;i++){
									que_arrayStr=que_list_array[i];
									
									que_array=que_arrayStr.split("fdfd");
									
									$('#tbl_show_to_queue').append('<tr onClick="recQueueDetails(\''+que_arrayStr+'\')" style="font-size:11px;"><td style="width:50%;" >'+que_array[0]+'<br/><strong>'+que_array[1]+'</strong></td><td style="width:50%;">'+que_array[2]+'<br/>'+que_array[3]+'</td></tr>');
								
								}
							$("#wait_image_to_queue_list").hide();
							$('#error_to_queue_list').text("");
							
						}
					
				}
			});	

	
	$("#wait_image_to_queue_list").hide();
	var url = "#page_to_queue_show";
	$.mobile.navigate(url);
	
}

function recQueueDetails(que_arrayStr){	
		$("#btn_token").show();
		que_array=que_arrayStr.split("fdfd");		
		$('#ds_sl_no').text(que_array[0]);
		$('#ds_palat_no').text(que_array[1]);
		$('#ds_dr_name').text(que_array[2]);
		$('#ds_dr_mobile_no').text(que_array[3]);
		
		$('#ds_tr_cus').text(que_array[4]);
		$('#ds_tr_cus_name').text(que_array[5]);
		$('#ds_cap').text(que_array[6]);
		$('#ds_party').text(que_array[7]);
		$('#ds_token').text(que_array[8]);	
		
		var url = "#dialogRecDetails";
		$.mobile.navigate(url);		
	}	



function printSlip(){
		var sl_no=$('#ds_sl_no').text();		
		//alert(apipath+'get_slip?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code+'&sl_no='+sl_no);
				
		$.ajax({
				url:apipath+'get_slip?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code+'&sl_no='+sl_no,
			  success: function(result) {
				  if(result=='Success'){				  		
					//print();					
					location.reload();
				  }
				}
			});	
		
	}	

//----------------------------- to ferry


//------------------------on Ferry

function parking2ListPage(){
	$('#tbl_show_parking_2').empty();
	
	//alert(apipath+'get_parking_2_list?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code); 
	
		$("#wait_image_parking_2_list").show();
			
		$.ajax({
				url:apipath+'get_parking_2_list?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code,
			  success: function(result) {						
						pr_2_list=result;
						
						if (pr_2_list!=""){
							pr_2_list_array=pr_2_list.split("rdrd");					
							
								for(i=0;i<pr_2_list_array.length;i++){
									pr_2_arrayStr=pr_2_list_array[i];
									
									pr_2_array=pr_2_arrayStr.split("fdfd");
									
									$('#tbl_show_parking_2').append('<tr onClick="recParking2Details(\''+pr_2_arrayStr+'\')" style="font-size:11px;"><td style="width:50%;" >'+pr_2_array[0]+'<br/><strong>'+pr_2_array[1]+'</strong></td><td style="width:50%;">'+pr_2_array[2]+'<br/>'+pr_2_array[3]+'</td></tr>');
								
								}
							$("#wait_image_pr_2_list").hide();
							$('#error_pr_2_list').text("");
							
						}
					
				}
			});	

	
	$("#wait_image_parking_2_list").hide();
	var url = "#page_parking_2_show";
	$.mobile.navigate(url);
	
}


function recParking2Details(pr_2_arrayStr){	
		$("#btn_token").show();
		pr2Array=pr_2_arrayStr.split("fdfd");		
		$('#ds_sl_no').text(pr2Array[0]);
		$('#ds_palat_no').text(pr2Array[1]);
		$('#ds_dr_name').text(pr2Array[2]);
		$('#ds_dr_mobile_no').text(pr2Array[3]);
		
		$('#ds_tr_cus').text(pr2Array[4]);
		$('#ds_tr_cus_name').text(pr2Array[5]);
		$('#ds_cap').text(pr2Array[6]);
		$('#ds_party').text(pr2Array[7]);
		$('#ds_token').text(pr2Array[8]);	
		
		var url = "#dialogRecDetails";
		$.mobile.navigate(url);
		
	}	

//--------------------- /parking






function searchListPage(){
	if(localStorage.sync_code==undefined || localStorage.sync_code==""){
		$(".errorChk").text("Required Sync");
	}else{
		$("#wait_image_search").hide();
		$('#tbl_show_all').hide();
		var url = "#page_search_show";
		$.mobile.navigate(url);
		}
	
	}

// ------------------------------------- Report data

function searchAllList(){
		$('#tbl_show_all').hide();
		var search_sl=$("#search_sl").val();
			
		$("#wait_image_search").hide();
				//alert(apipath+'get_search_que_card?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code+'&search_sl='+search_sl); 
	
		$.ajax({
				url:apipath+'get_search_que_card?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code+'&search_sl='+search_sl,
				
			  success: function(result) {
						all_list=result;
						
						if (all_list==""){
							$('#tbl_show_all').hide();
							$('#error_search').text("Invalid Sl No");
							
							}else{
								$('#error_search').text("");
								all_array=all_list.split("fdfd");
						
								$('#s_sl_no').text(all_array[0]);
								$('#s_plt_no').text(all_array[1]);
								$('#s_dr_name').text(all_array[2]);
								$('#s_dr_mobile_no').text(all_array[3]);
								
								$('#s_tr_cus').text(all_array[4]);
								$('#s_tr_cus_mobile_no').text(all_array[5]);
								$('#s_capacity').text(all_array[6]);
								$('#s_party').text(all_array[7]);
								$('#s_token').text(all_array[8]);
								$('#s_status').text(all_array[9]);
								
								
								$('#tbl_show_all').show();
								}					
						
						
					
						$("#wait_image_search").hide();	
					}
			});	
	}
	

//---------------------- Exit Application
function exit() {	
	navigator.app.exitApp();
}







