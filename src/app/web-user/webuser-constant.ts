// export const webUserConstants = {
//     assignmentIcon:'../../assets/img/fielduser/Tasks.svg',

//     apis:{
//         assignmentsList : '/api/v1/mobileServices/taskAssignments'
//     }
// }
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

// tslint:disable-next-line:class-name
export class webUserConstants {

    public static mainPath = environment.baseUrl + '/api/v1/';
    public static gridFSUrl =  environment.baseUrl + '/api/v2';
    public static apis = {
        assignmentsList : webUserConstants.mainPath + 'mobileServices/workAssignments',
        getForm : webUserConstants.mainPath + 'forms/formSkeleton',
        submitForm: webUserConstants.mainPath + 'mobileServices/addRecord',
        logout: environment.baseUrl + '/api/v0' + '/weblogout',
        history: webUserConstants.mainPath + 'mobileServices/getHistory',
        imageView: webUserConstants.gridFSUrl + '/gridFS/fetchImageOrVideo',
        formsList : webUserConstants.mainPath + 'mobileServices/fetchFormsforUser',
        formInfo : webUserConstants.mainPath + 'mobileServices/formInfo',
        getWorkOrders: webUserConstants.mainPath + 'mobileServices/fetchWorkAssignmentRecords',
        publicFormLink : webUserConstants.mainPath + 'formLinks/getFormData',
        addRecordFromLink: webUserConstants.mainPath + 'formLinks/addRecordFromFormLink',
        getDyanmicFormData: webUserConstants.mainPath + 'forms/dynamicDropdown',
        getAttachMents: webUserConstants.gridFSUrl + '/gridFS/getAttachmentsOfRecordId',
        getAttachedReferenceOfForm: webUserConstants.gridFSUrl + '/gridFS/getAttachedReferenceOfForm',
        getAttachmentConfigureations: webUserConstants.mainPath + 'configurations/getAttachmentsConfig'


    };
    public static formConstants = {
        openform : 'openform',
        sucessFormSubmitmessage: 'Please fill in all mandatory fields marked with an asterisk (*) or Provide valid data',
        anonymous : 'Anonymous'

    };
    public static formAttachments = {
        allowedFileSizeExisted: 'You cannot upload more than  '
    };
    

    public static workAssigmnetsConstants = {
        noWorkAssignmentstoLaod : 'No more assignments to load'
    };

    // global constants for all files
    public static assignmentIcon = require('../../assets/img/fielduser/Tasks.svg');
    public static formsIcon = require('../../assets/img/fielduser/Forms.svg');
    public static successClapIcon = require('../../assets/img/fielduser/success-clap.jpg');
    public static somethingWrong = require('../../assets/img/fielduser/something-went-wrong.jpg');
    public static noDataFound = require('../../assets/img/fielduser/Icon-Nodatafound.svg');
    public static serverNotReachable = require('../../assets/img/FeildOn_Logo.png');
    public static formSuccess = require('../../assets/img/fielduser/Congrats.png');
    public static attachmnet = require('../../assets/img/fielduser/attach.svg');
    public static uploadFile = require('../../assets/img/fielduser/file-upload.svg');

    public static nullValue = null;
    public static nullString = 'null';
    public static formFillActionType = 'fill';
    public static formReassignActionType = 'reassign';
    public static formprepopActionType = 'prepop';
    public static formViewActionType = 'view';
    public static actionPageForAssignmnets = 'tasks';
    public static actionPageForForms = 'forms';
    public static pageLimit = 12;


    public static standardKeys = {
      status: 'status',
      data: 'data'
    };

    public static assignmentsHistoryConstants = {
      displaykey: 'displaykey',
      noHistoryToLaod : 'No more records to load'
    };


    public static privatekey = 'F!3LD0N:M@G!KM!ND$'

    public static formExitMsg = "Changes you made may not be saved.Do you wish to continue?";
   
   
    public static constantKeys = {
      formExitMsg :"Changes you made may not be saved.Do you wish to continue?",
      calculationErrMsg:'Some fields are missing to fill',
      fileFormatMsg:'Please attach JPEG and PNG formatted image file only',
      maxTimeLimitMsg:'Maximum Time limit reached',
      minTimeLimitMsg:'Minimum Time limit reached',
      fileInprogressMsg:'You can\'t delete, file in process',
      invalidFileMsg:'Invalid file',
      fileSizeMsg1:'File size cannot exceed ',
      fileSizeMsg2:' MB',
      uploadedFiles:'Uploaded Files',
      label_Delete:'Delete',
      label_Download:'Download',
      label_Filter:'Filter',
      label_Back:'Back',
      attachedFiles:'Attached Files',
      addNewWorkOrder:'Add new workorder',
      size:'Size',
      date:'Date',
      action:'Action',
      helpDesk:'Help Desk',
        myProfile:'My Profile',
        changePwd:'Change Password',
        toolTipForms:'Forms',
        toolTipAssignments:'Assignments',
        workAssignments:'Work Assignments',
        assignedBy:'Assigned By',
        dueDate:'Due date',
        showInfo:'Show Info',
        History:'History',
        Fill:'Fill',
        gotoWorkOrders:'Go to Work Orders',
        Reassigned:'Re-assigned',
        fillForm:'Fill Form',
        logOut:'Logout'

    }
    
    public static dateFormats = {
      ddmmyyyy : 'DD-MM-YYYY',
      mmddyyy :'MM-DD-YYYY',
      yyyymmdd : 'YYYY-MM-DD'
  }
}
