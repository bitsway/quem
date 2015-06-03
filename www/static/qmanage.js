
//online
var apipath="http://e2.businesssolutionapps.com/quem/syncmobile/";

//local
//var apipath="http://127.0.0.1:8000/quem/syncmobile/";


//var mobile_off_flag=0;

//-------GET GEO LOCATION
/*function getLocationInfo() { //location
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}*/

// onSuccess Geolocation
/*function onSuccess(position) {
	$("#lat").val(position.coords.latitude);
	$("#long").val(position.coords.longitude);
	
	$("#lat_p").val(position.coords.latitude);
	$("#long_p").val(position.coords.longitude);
	
	$("#lat_complain").val(position.coords.latitude);
	$("#long_complain").val(position.coords.longitude);
	
	$("#checkLocation").html('Location Confirmed');
	$("#checkLocationProfileUpdate").html('Location Confirmed');
	$("#checkLocationComplain").html('Location Confirmed');	
}
*/
/*function onError(error) {
	$("#lat").val(0);
	$("#long").val(0);
	
	$("#lat_p").val(0);
	$("#long_p").val(0);
	
	$("#lat_complain").val(0);
	$("#long_complain").val(0);
	
	$("#checkLocation").html('Location not found');
	$("#checkLocationProfileUpdate").html('Location not found');
	$("#checkLocationComplain").html('Location not found');
	
	}*/


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


var imageName = "";
var imagePathA="";

$(document).ready(function(){	
	$("#wait_image_login").hide();
	$("#wait_image_parking_list").hide();
	$("#wait_image_to_ferry_list").hide();
	$("#wait_image_on_ferry_list").hide();
	
	$("#wait_image_search").hide();
	$('#tbl_show_all').hide();
	$("#trans_depot").hide();
	
	$("#wait_image_to_submit").hide();
	
	});

// -------------- If Not synced, Show login
function first_page(){
	if ((localStorage.synced!='YES')){
		var url = "#login";
		$.mobile.navigate(url);		
	}
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
			
			//alert(apipath+'passwordCheck?cid=LAFARGE&mobile='+user_id+'&password='+encodeURI(user_pass)+'&sync_code='+localStorage.sync_code);
										
			$.ajax({
					 type: 'POST',
					 url: apipath+'passwordCheck?cid=LAFARGE&mobile='+user_id+'&password='+encodeURI(user_pass)+'&sync_code='+localStorage.sync_code,
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
															
									localStorage.mobile_no=user_id;
									
									
									$("#error_login").html('');
									$("#wait_image_login").hide();
									$("#loginButton").show();
									
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
	$("#trans_depot").hide();
	$("#success_msg").text("");
	$("#wait_image_to_submit").hide();
	
	if(localStorage.sync_code==undefined || localStorage.sync_code==""){
		$(".errorChk").text("Required Sync");
	}else{
		$("#btnTruckInfo").show();
		
		$("#err_truck_info").text("");
		
		$("#plateNo").val("");
		//$("#platePhoto").val("");
		$("input:radio[name='transCus']" ).attr('checked','');
		$("#trnCusName").val("");
		$("#drMsName").val("");
		$("#mobileNo").val("");
		$("#numOfBag").val("");
		$("input:radio[name='party']" ).attr('checked','');
		$("#tokenNo").val("");
		
		var url = "#newEntry";
		$.mobile.navigate(url);
		}
	
	}


function chkParty(){	
	party=$("input[name='party']:checked").val();	
	if (party=="ST"){
		$("#trans_depot").show();
	}else{
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
		party=$("input[name='party']:checked").val();
		tokenNo=$("#tokenNo").val();
		
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
			if (plateNo=="" || plateNo==undefined || transOrCus=="" || transOrCus==undefined || trnCusName=="" || trnCusName==undefined || drMsName=="" || drMsName==undefined || drMobileNo=="" || drMobileNo==undefined || numOfBag=="" || numOfBag==undefined || party=="" || party==undefined){
				
				$("#err_truck_info").text("Required field ");
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
							
							//imagePathA="test"
							if (imagePathA!=""){								
								$("#err_truck_info").text("Syncing photo..");
								imageName = localStorage.mobile_no+"_"+get_time+".jpg";	
												
								uploadPhotoTruckPlate(imagePathA, imageName);
							}
						}
					}
				/*	}
				}*///end check location
		}//chk photo
	}

function syncDataTruckInfo(){	
			
			//alert(apipath+'submitTruckInfo?cid=LAFARGE&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&plateNo='+plateNo+'&transOrCus='+transOrCus+'&trnCusName='+trnCusName+'&drMsName='+drMsName+'&drMobileNo='+drMobileNo+'&numOfBag='+numOfBag+'&party='+party+'&tokenNo='+tokenNo+'&plate_photo='+imageName);
			
			$.ajax({
					type: 'POST',
					url:apipath+'submitTruckInfo?cid=LAFARGE&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&plateNo='+plateNo+'&transOrCus='+transOrCus+'&trnCusName='+trnCusName+'&drMsName='+drMsName+'&drMobileNo='+drMobileNo+'&numOfBag='+numOfBag+'&party='+party+'&tokenNo='+tokenNo+'&plate_photo='+imageName,
					   
					   success: function(result) {
							//alert(result);
						if(result=='Success'){							
							//----------------
							$("#plateNo").val("");
							//$("#platePhoto").val("");
							$("input:radio[name='transCus']" ).attr('checked','');
							$("#trnCusName").val("");
							$("#drMsName").val("");
							$("#mobileNo").val("");
							$("#numOfBag").val("");
							$("input:radio[name='party']" ).attr('checked','');
							$("#tokenNo").val("");
														
							$("#success_msg").text('Successfully Submitted');
							$("#wait_image_to_submit").hide();
							$("#btnTruckInfo").hide();
							$("#btn_take_pic").hide();
							
							
							
							var url="#successPage";
							$.mobile.navigate(url);
													
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
//    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.fileName=imageName;
//	options.fileName = options.fileName
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://i01.businesssolutionapps.com/que_image/quem_image_sync/fileUploader/"),winTruckInfo,onfail,options);
	//ft.upload(imageURI, encodeURI("http://127.0.0.1:8000/quem/quem_image_sync/fileUploader/"),winTruckInfo,fail,options);
	
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

function parkingListPage(){
	$('#tbl_show_parking').empty();
	
	//alert(apipath+'get_parking_que_card?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code); 
	
		$("#wait_image_parking_list").show();
			
		$.ajax({
				url:apipath+'get_parking_que_card?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code,
			  success: function(result) {						
						pr_list=result;
						
						if (pr_list!=""){
							pr_list_array=pr_list.split("rdrd");					
							
								for(i=0;i<pr_list_array.length;i++){
									pr_arrayStr=pr_list_array[i];
									
									pr_array=pr_arrayStr.split("fdfd");
									
									$('#tbl_show_parking').append('<tr onClick="recParkingDetails(\''+pr_arrayStr+'\')" style="font-size:11px;"><td style="width:50%;" >'+pr_array[0]+'<br/><strong>'+pr_array[1]+'</strong></td><td style="width:50%;">'+pr_array[2]+'<br/>'+pr_array[3]+'</td></tr>');
								
								}
							$("#wait_image_parking_list").hide();
							$('#error_parking_list').text("");
							
						}
					
				}
			});	

	
	$("#wait_image_parking_list").hide();
	var url = "#page_parking_show";
	$.mobile.navigate(url);
	
}


function recParkingDetails(recFerryStr){
			
		fr_array=recFerryStr.split("fdfd");		
		$('#ds_sl_no').text(fr_array[0]);
		$('#ds_palat_no').text(fr_array[1]);
		$('#ds_dr_name').text(fr_array[2]);
		$('#ds_dr_mobile_no').text(fr_array[3]);
		
		$('#ds_tr_cus').text(fr_array[4]);
		$('#ds_tr_cus_name').text(fr_array[5]);
		$('#ds_cap').text(fr_array[6]);
		$('#ds_party').text(fr_array[7]);
		$('#ds_token').text(fr_array[8]);	
		
		var url = "#dialogFerryRecDetails";
		$.mobile.navigate(url);
		
	}	

//--------------------- /parking


function toFerryListPage(){
	$('#tbl_show_to_ferry').empty();
	
	//alert(apipath+'get_to_ferry_que_card?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code); 
	
		$("#wait_image_to_ferry_list").show();
			
		$.ajax({
				url:apipath+'get_to_ferry_que_card?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code,
			  success: function(result) {					
						fr_list=result;						
						if (fr_list!=""){
							fr_list_array=fr_list.split("rdrd");					
							
								for(i=0;i<fr_list_array.length;i++){
									fr_arrayStr=fr_list_array[i];
									
									fr_array=fr_arrayStr.split("fdfd");
									
									$('#tbl_show_to_ferry').append('<tr onClick="recToFerryDetails(\''+fr_arrayStr+'\')" style="font-size:11px;"><td style="width:50%;" >'+fr_array[0]+'<br/><strong>'+fr_array[1]+'</strong></td><td style="width:50%;">'+fr_array[2]+'<br/>'+fr_array[3]+'</td></tr>');
								
								}
							$("#wait_image_to_ferry_list").hide();
							$('#error_to_ferry_list').text("");
							
						}
					
				}
			});	

	
	$("#wait_image_to_ferry_list").hide();
	var url = "#page_to_ferry_show";
	$.mobile.navigate(url);
	
}

function recToFerryDetails(recStr){	
			
		fr_array=recStr.split("fdfd");		
		$('#ds_sl_no').text(fr_array[0]);
		$('#ds_palat_no').text(fr_array[1]);
		$('#ds_dr_name').text(fr_array[2]);
		$('#ds_dr_mobile_no').text(fr_array[3]);
		
		$('#ds_tr_cus').text(fr_array[4]);
		$('#ds_tr_cus_name').text(fr_array[5]);
		$('#ds_cap').text(fr_array[6]);
		$('#ds_party').text(fr_array[7]);
		$('#ds_token').text(fr_array[8]);	
		
		var url = "#dialogFerryRecDetails";
		$.mobile.navigate(url);
		
	}	



function printSlip(){		
		var sl_no=$('#ds_sl_no').text();			
		
		//alert(apipath+'get_slip?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code+'&sl_no='+sl_no);
				
		$.ajax({
				url:apipath+'get_slip?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code+'&sl_no='+sl_no,
			  success: function(result) {
				  if(result=='Success'){				  		
					print();					
					location.reload();
				  }
				}
			});	
		
		
	}	

//----------------------------- to ferry


//------------------------on Ferry

function onFerryListPage(){
	$('#tbl_show_on_ferry').empty();
	
	//alert(apipath+'get_on_ferry_que_card?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code); 
	
		$("#wait_image_on_ferry_list").show();
			
		$.ajax({
				url:apipath+'get_on_ferry_que_card?cid=LAFARGE&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code,
			  success: function(result) {						
						on_fr_list=result;
						
						if (on_fr_list!=""){
							on_fr_list_array=on_fr_list.split("rdrd");					
							
								for(i=0;i<on_fr_list_array.length;i++){
									on_fr_arrayStr=on_fr_list_array[i];
									
									on_fr_array=on_fr_arrayStr.split("fdfd");
									
									$('#tbl_show_on_ferry').append('<tr onClick="recOnFerryDetails(\''+on_fr_arrayStr+'\')" style="font-size:11px;"><td style="width:50%;" >'+on_fr_array[0]+'<br/><strong>'+on_fr_array[1]+'</strong></td><td style="width:50%;">'+on_fr_array[2]+'<br/>'+on_fr_array[3]+'</td></tr>');
								
								}
							$("#wait_image_on_ferry_list").hide();
							$('#error_on_ferry_list').text("");
							
						}
					
				}
			});	

	
	$("#wait_image_on_ferry_list").hide();
	var url = "#page_on_ferry_show";
	$.mobile.navigate(url);
	
}


function recOnFerryDetails(recFerryStr){		
		fr_array=recFerryStr.split("fdfd");		
		$('#ds_sl_no').text(fr_array[0]);
		$('#ds_palat_no').text(fr_array[1]);
		$('#ds_dr_name').text(fr_array[2]);
		$('#ds_dr_mobile_no').text(fr_array[3]);
		
		$('#ds_tr_cus').text(fr_array[4]);
		$('#ds_tr_cus_name').text(fr_array[5]);
		$('#ds_cap').text(fr_array[6]);
		$('#ds_party').text(fr_array[7]);
		$('#ds_token').text(fr_array[8]);	
		
		var url = "#dialogFerryRecDetails";
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







