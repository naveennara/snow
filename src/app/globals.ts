// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
export const itemsPerPage = 12;
export const attachmentLimit = 10;
export const secretKey = 'F!3LD0N:M@G!KM!ND$';
export const Privileges = { dashboard:'dashboard', accounts : 'accounts', 
admins:'admins', users: 'users', forms: 'forms', templates: 'templates', projects: 'projects', 
tasks: 'tasks', devices: 'devices', category: 'category',workflow:'workflow',dataloader:'dataloader', downloads: 'downloads', settings: 'settings',licenses:'licenses',gsalite:'gsalite' };
export const routes=  { dashboard:'mainLayout/dashboard',
  accounts :'mainLayout/accounts',
  admins:'mainLayout/administrators',
  users:'mainLayout/users',
  category:'mainLayout/categories',
  devices:'mainLayout/deviceManagement',
  templates:'mainLayout/templates', 
  forms:'mainLayout/forms',  
  projects: 'mainLayout/projectsTab/projects', 
  tasks: 'mainLayout/tasks',  workflow:'mainLayout/workFlowManagement',
  approvals:'mainLayout/approvals',
  downloads: 'mainLayout/downloads', settings:'mainLayout/settings',licenses:'mainLayout/licenses',
  dataloader:'mainLayout/dataloader'}

export const taskStatus = [
    'New',
    'Assigned',
    'In progress',
    'workflow Cycle Started',
    'Completed'
  ]
  export const taskStatusObject  = {
    New :'New',
    Assigned:'Assigned',
    Inprogress:'In progress',
    Completed:'Completed',
    workflowCycleStarted:'workflow Cycle Started'
  }
  export const dateFormats = {
      ddmmyyyy : 'DD-MM-YYYY',
      mmddyyy :'MM-DD-YYYY',
      yyyymmdd : 'YYYY-MM-DD'
  }
export const loginTypes = {0:'Super Admin',1:'Account Administrator',2:'Web User',3:'Group Administrator',4:'Moderator',5:'Moderator',6:'MagikMinds'};
export const browserkeys = {browser_version:'Chrome',versionMsg:'Browser is of old version.Some functionalities may work different with current version.Press Ok to continue',browserMsg:'Chrome is recommended.Some functionalities may work different with current browser.Press Ok to continue.'};
  // GLOBAL STATIC IMAGES USED IN APPLICATION
// NOTE: USE THIS IMAGES IN THE MODULES YOU WANT TO USE
declare var require: any;
// declare var require: NodeRequire;
export const orgImage = require('../assets/img/Formsz_Logo_white-01.svg').default;
export const imageSrc = require('../assets/img/admin.jpg').default;
export const noDataFound = require('../assets/img/No_data_available.png').default;
// << END GLOBAL STATIC IMAGES USAGE >>

// Login images
export const imageSrc1 = require('../assets/img/FeildOn_Logo.png').default;
export const sliderImg1 = require('../assets/img/FeildOn_Logo.png').default;
// export const sliderImg2 = require('../assets/img/Geo-tagging.svg').default;
// export const sliderImg3 = require('../assets/img/Photo-capture.svg').default;

// export const slide001 = require('../assets/img/slides/Slide-01.jpg').default;
// export const slide002 = require('../assets/img/slides/Slide-02.jpg').default;
// export const slide003 = require('../assets/img/slides/Slide-03.jpg').default;

export const carousal_Slides = {
    slide001 : require('../assets/img/carousal/Design-Custom-Forms.png').default,
    slide002 : require('../assets/img/carousal/Built-in-Services-Integration.png').default,
    slide003 : require('../assets/img/carousal/Digital-signature.png').default,
    slide004 : require('../assets/img/carousal/Flexible-Dashboards.png').default,
    slide005 : require('../assets/img/carousal/GPS-BarCode.png').default,
    slide006 : require('../assets/img/carousal/Multiple-User-Facility.png').default,
    slide007 : require('../assets/img/carousal/Photo-capture.png').default,
    slide008 : require('../assets/img/carousal/Time-Stamps.png').default
};

export const greetings = {
    GM : require('../assets/img/Greetings/Good_Morning.svg').default,
    GA : require('../assets/img/Greetings/Good_Afternoon.svg').default,
    GE : require('../assets/img/Greetings/Good_Evening.svg').default
};

export const Icons = {
    camera : require('../assets/img/customCaurosal/camera.png').default,
    map : require('../assets/img/customCaurosal/map-location.png').default,
    dashboard : require('../assets/img/customCaurosal/dashboard.png').default,
    digitalSignature : require('../assets/img/customCaurosal/digitalsignature.png').default,
    form : require('../assets/img/customCaurosal/form.png').default,
    timeStamp : require('../assets/img/customCaurosal/Time-stamp.png').default,
    builtinServices : require('../assets/img/customCaurosal/BuiltinServices.png').default,
    multipleUserFacility : require('../assets/img/customCaurosal/multipleUserFacility.png').default,
    GM : require('../assets/img/customCaurosal/Good_Morning.png').default,
    GA : require('../assets/img/customCaurosal/Good_Afternoon.png').default,
    GE : require('../assets/img/customCaurosal/Good_Evening.png').default,
    dataloader : require('../assets/img/customCaurosal/Good_Evening.png').default,
    gsalite : require('../assets/img/customCaurosal/Good_Evening.png').default,
    preview : require('../assets/img/customCaurosal/Good_Evening.png').default
};

// SVG Icons:
export const svgIcons = {
    textBox : require('../assets/img/icons/Text_box.svg').default,
    textArea : require('../assets/img/icons/Text-area.svg').default,
    checkBox : require('../assets/img/icons/Check-box.svg').default,
    radio : require('../assets/img/icons/Radio_button.svg').default,
    dropdown : require('../assets/img/icons/Dropdown.svg').default,
    camera : require('../assets/img/icons/camera.svg').default,
    video_camera : require('../assets/img/icons/Video_camera.svg').default,
    signature : require('../assets/img/icons/Signature.svg').default,
    rating : require('../assets/img/icons/Rating.svg').default,
    calendar : require('../assets/img/icons/Calendar.svg').default,
    calculator : require('../assets/img/icons/Calculator.svg').default,
    map : require('../assets/img/icons/MapWidget.svg').default,
    barcode : require('../assets/img/icons/Barcode.svg').default,
    table : require('../assets/img/icons/Table.svg').default,
    number : require('../assets/img/icons/Numbers.svg').default,
    header : require('../assets/img/icons/header.svg').default,
    pageBreak : require('../assets/img/icons/Page_Break.svg').default,
    time : require('../assets/img/icons/Time_Widget.svg').default,
    userProperties : require('../assets/img/icons/User_Properties.svg').default,
    referenceList : require('../assets/img/icons/DynamicDropdownGrey.svg').default,
    // Workflow history directional Icons:
    // ( Short name W: Workflow, A: Accepted, R: Rejected, L: Left, R: Right, B: Bottom)
    WAR : require('../assets/img/icons/WAR.svg').default,
    WAL : require('../assets/img/icons/WAL.svg').default,
    WAB : require('../assets/img/icons/WAB.svg').default,
    WRR : require('../assets/img/icons/WRR.svg').default,
    WRL : require('../assets/img/icons/WRL.svg').default,
    WRB : require('../assets/img/icons/WRB.svg').default,
    // Action icons:
    Delete : require('../assets/img/icons/delete.svg').default,
    Edit : require('../assets/img/icons/Edit.svg').default,
    Record : require('../assets/img/icons/Record.svg').default,
    Eye : require('../assets/img/icons/Eye-on.svg').default,
    EyeOff : require('../assets/img/icons/Eye-off.svg').default,
    Save : require('../assets/img/icons/Save.svg').default,
    submitted : require('../assets/img/icons/Submitted.svg').default,
    pending : require('../assets/img/icons/Pending.svg').default,
    reassign : require('../assets/img/icons/Re-assign.svg').default,
    excel : require('../assets/img/icons/Excel.svg').default,
   // download : require('../assets/img/icons/download.svg').default,
    history : require('../assets/img/icons/history.svg').default,
    info : require('../assets/img/icons/Info.svg').default,
    preview : require('../assets/img/icons/preview.svg').default,
    getRecords: require('../assets/img/icons/Get records.svg').default,
    pendingDays:  require('../assets/img/icons/Number of days pending.svg').default,
    mapConfig : require('../assets/img/icons/Map-Blue.svg').default,
    profile:require('../assets/img/icons/Profile-Blue.svg').default,
    privileges:require('../assets/img/icons/Privileges-Blue.svg').default,
    configurations:require('../assets/img/icons/Configuration-Blue.svg').default,
    dynamicDropdown:require('../assets/img/icons/DynamicDropdown-Blue.svg').default,
    mapLayer:require('../assets/img/icons/MapLayer.svg').default,
    SecurityIcon:require('../assets/img/icons/SecurityIcon.svg').default,
    mapSketching:require('../assets/img/icons/MapWhite.svg').default,
    mapSketchingCross:require('../assets/img/icons/MapCrossWhite.svg').default,
    deviceApproval:require('../assets/img/icons/Deviceapproval.svg').default,
    workflowApproval : require('../assets/img/icons/WorkFlowapproval.svg').default,
    renewLicense: require('../assets/img/icons/RenewalLicense.svg').default,
    recordWFFilter:require('../assets/img/icons/Filter-Grey.svg').default,
    recordWFFilterUndo : require('../assets/img/icons/Filter-White.svg').default,
    frontFlip: require('../assets/img/icons/Front-Flip.svg').default,
    backFlip:require('../assets/img/icons/Back-Flip.svg').default,
    SecurityIconGrey:require('../assets/img/icons/SecurityIconGrey.svg').default,
    accountSettings:require('../assets/img/icons/AccountSetting.svg').default,
    applicationSettings:require('../assets/img/icons/ApplicationSetting.svg').default,
    markerLocation:require('../assets/img/icons/Marker.svg').default,
    insertedLocation:require('../assets/img/icons/InsertPlace.svg').default,
};

export const sidebarIcons = {
    dashboard : require('../assets/img/sidebar/Dashboard.svg').default,
    categories : require('../assets/img/sidebar/Category.svg').default,
    templates : require('../assets/img/sidebar/Templates.svg').default,
    administrators : require('../assets/img/sidebar/Administrators.svg').default,
    users : require('../assets/img/sidebar/Users.svg').default,
    projects: require('../assets/img/sidebar/Project.svg').default,
    departments : require('../assets/img/sidebar/Departments.svg').default,
    tasks : require('../assets/img/sidebar/Tasks.svg').default,
    forms : require('../assets/img/sidebar/Forms.svg').default,
    deviceManagement :  require('../assets/img/sidebar/DeviceManagement.svg').default,
    workflow : require('../assets/img/sidebar/WorkFlow.svg').default,
    download : require('../assets/img/sidebar/Download.svg').default,
    settings : require('../assets/img/sidebar/Settings.svg').default,
    license : require('../assets/img/sidebar/License Management.svg').default,
    mapLocation: require('../assets/img/sidebar/Map.svg').default,
    dataloader : require('../assets/img/sidebar/snow_dataloader.svg').default,
    gsalite : require('../assets/img/sidebar/snow_gsalite.svg').default
};

export const headerIcons = {
    dashboardGrey : require('../assets/img/headerIcons/DashboardGrey.svg').default,
    categoriesGrey : require('../assets/img/headerIcons/CategoryGrey.svg').default,
    templatesGrey : require('../assets/img/headerIcons/TemplatesGrey.svg').default,
    administratorsGrey : require('../assets/img/headerIcons/AdministratorsGrey.svg').default,
    usersGrey : require('../assets/img/headerIcons/UsersGrey.svg').default,
    projectsGrey: require('../assets/img/headerIcons/ProjectGrey.svg').default,
    departmentsGrey : require('../assets/img/headerIcons/DepartmentsGrey.svg').default,
    tasksGrey : require('../assets/img/headerIcons/TasksGrey.svg').default,
    formsGrey : require('../assets/img/headerIcons/FormsGrey.svg').default,
    deviceManagementGrey :  require('../assets/img/headerIcons/DeviceManagementGrey.svg').default,
    workflowGrey : require('../assets/img/headerIcons/WorkFlowGrey.svg').default,
    downloadGrey : require('../assets/img/headerIcons/DownloadGrey.svg').default,
    settingsGrey : require('../assets/img/headerIcons/SettingsGrey.svg').default,
    licenseGrey : require('../assets/img/headerIcons/License ManagementGrey.svg').default,
    mapLocationGrey : require('../assets/img/headerIcons/MapGrey.svg').default
};

const baseUrl = environment.baseUrl;
const apiUrl =  baseUrl + '/api/v0';
const serverURL = baseUrl + '/api/v1';
const unsecureUrl = baseUrl + '/api/v';
const gridFSURL = baseUrl + '/api/v2';
export const snowURL = baseUrl + '/api/snow';

export const urls = {

    login: apiUrl + '/login',

    forgotPassword: apiUrl + '/forgotpwd',

    changePassword: apiUrl + '/pwdchange',

    licenseReleaseForExistinglogin: apiUrl + '/licenseReleaseForExistinglogin',

    Global_imagePath: unsecureUrl + '/',

    logout: apiUrl + '/weblogout',

    resetPassword: apiUrl + '/resetPassword',

    // DASHBOARD SERVICES

    getDashBoardCounts: serverURL + '/dashboards/getDashboardData',

    getinActiveCount: serverURL + '/dashboards/inActiveUsersListInRootLogin',

    getTasksListInRoot: serverURL + '/dashboards/getTasksListInRoot',

    getProjectTasksForDashboard: serverURL + '/dashboards/getProjectTasksForDashboard',

    releaseUserLicense: apiUrl + '/releaseLicense',

    getDepartment: serverURL + '/accounts/getDeptsFromView',

    getFormCategoryByUser: serverURL + '/formsCategories/getFormsCategories',

    editDepartment: serverURL + '/accounts/getAccounts',

    deptAdminsList : serverURL + '/accounts/getAssociatedUsers',

    removeAdmins :  serverURL + '/accounts/disassociateAdmins',

    UpdateDepartment: serverURL + '/accounts/update',

    createCategory: serverURL + '/formsCategories/addFormsCategory',

    createDepartment: serverURL + '/accounts/create',

    deleteDepartment: serverURL + '/accounts/delete',

    //getFormCategory: serverURL + '/formsCategories/getFormsCategory',

    getFormsCategoryForAccount:serverURL + '/formsCategories/getFormsCategoryForAccount',

    deleteFormCategory: serverURL + '/formsCategories/delete',

    editCategory: serverURL + '/formsCategories/editFormsCategory',

    viewCategory: serverURL + '/formsCategories/getFormsCategory',

    getallUsers: serverURL + '/users/getusernames',

    getgroupadmins: serverURL + '/admins/getGroupAdmins',

    getUnMappedAdminList: serverURL + '/admins/unmappedAdmins',

    getAdmin: serverURL + '/admins/getAdmins',

    deptWiseWorkFlows : serverURL + '/workflowMangement/getWorkflows',

    deptWiseWorkFlowNames : serverURL + '/workflowMangement/fetchWFBasedonAccount',

    deleteAdmin: serverURL + '/admins/delete',

    createAdmin : serverURL + '/admins/create',

    getUnMappedDept: serverURL + '/accounts/unmappedAccounts',

    getGroupAdminsnMods: serverURL + '/admins/getGroupAdminsnModerators',

    createWorkFlow: serverURL + '/workflowMangement/create',

    getWorkFlowData: serverURL + '/workflowMangement',

    deleteWorkflowData: serverURL + '/workflowMangement/delete',

    getAllListOfDepartments : serverURL + '/accounts/getAccounts',

    updateAdministrator: serverURL + '/admins/update',

    editAdministrator: serverURL + '/admins',

    createUser: serverURL + '/users/create',

    getTasks : serverURL + '/tasks/getTasks',

    getUser: serverURL + '/users/getUsers',

    xlsxtojsonuser: serverURL + '/users/xlsxtojsonuser',

    updateWorkFlow: serverURL + '/workflowMangement/update',

    createTask : serverURL + '/tasks/createTask',

    createUserFromFile: serverURL + '/users/createUsersFromFile',

    editUser: serverURL + '/users',

    updateUser: serverURL + '/users/update',

    deleteUser: serverURL + '/users/delete',

    getUsersByDeptId: serverURL + '/tasks/getUsers',

    getAllActivities: serverURL + '/activitylogs/getAllActivities',

    getFormszByCategory: serverURL + '/forms/getFormsByCategory',

    getTaskData : serverURL + '/tasks',

    // createTaskWorkAssignment :  serverURL + '/tasks/addTaskAssignment',

    getTaskBasicInfo :  serverURL + '/tasks',

    createForm: serverURL + '/forms/create',

    isFormExists: serverURL + '/forms/checkIfFormExists',

    formDownload :serverURL + '/forms/formDownloadAsExcel',

    getGroupAdminsByDept: serverURL + '/admins/getGroupAdmins',

    createProject : serverURL + '/projects/addProject',

    getProjectList: serverURL + '/projects/getProjects',

    editProject: serverURL + '/projects/getProject',

    updateProject: serverURL + '/projects/updateProject',

    deleteProject: serverURL + '/projects/delete',

    getUsersList: serverURL + '/users/getUsers',

    updateTask: serverURL + '/tasks/update',

    deleteTask: serverURL + '/tasks/delete',

    getDevicelist: serverURL + '/deviceManagement/getDeviceList',

    updateDeviceStatus: serverURL + '/deviceManagement/updateDeviceStatus',

    getAllDeviceActivities : serverURL + '/activitylogs/getAllActivities',

    deleteDeviceRequest: serverURL + '/deviceManagement/deleteDevice',

    search: serverURL + '/search/searchForPattern',

    getTaskWorkAssigns : serverURL + '/tasks/getWorkAssignments',

    updateTaskAssignment: serverURL + '/tasks/updateWorkAssignment',

    getCategoriesByView: serverURL + '/formsCategories/getFormsCategories',

    // getTasks: serverURL + '/tasks/getTasks',

    getProjects: serverURL + '/projects/getProjects',

    getDepartments: serverURL + '/accounts/getAccounts',


    getWorkflowMangementAssigneeInfo : serverURL + '/workflowMangement/getAssigneeInfo',

    getWorkflowHistoryForTask : serverURL + '/workflowMangement/getWorkflowHistory',

    updateWorkflowcycle : serverURL + '/workflowMangement/taskReview',

    recordWFData: serverURL + '/workflowMangement/getRecordLevelWorkflowData',

    updateRecordReview:serverURL + '/workflowMangement/recordReview',

    getformszlists: serverURL + '/forms/getforms',

    getWorkflowFormsForMod: serverURL + '/forms/getWorkflowFormsForMod',

    createWorkAssignments: serverURL + '/tasks/addWorkAssignment',

    convertExcel: serverURL + '/tasks/convertExcelToJSON',

    pwdCheckforChangePassword: apiUrl + '/pwdCheckforChangePassword',

    getform: serverURL + '/forms',

    updateForm : serverURL + '/forms/update',

    deleteform: serverURL + '/forms/delete',

    deleteWorkAssign: serverURL + '/tasks/deleteWorkAssignment',

    getWorkAssign: serverURL + '/tasks/getWorkAssignment',

    getProjectInfo: serverURL + '/projects/getProject',

    getUsersAndFormsAssinegdToTask : serverURL + '/tasks/getUsersAndFormsAssinegdToTask',

    getRecords : serverURL + '/records/getRecords',

    excelDownload:serverURL+"/reports/generateExcel",

    pdfDownload : serverURL+"/reports/generatePDF",

    reAssign : serverURL + "/tasks/reassignRecord",

    getWorkflowHistory : serverURL + '/workflowMangement/getWorkflowHistory',

    fetchImageOrVideo : gridFSURL + '/gridFS/fetchImageOrVideo',
    
    fecthWebImage : gridFSURL + '/gridFs/fetchWebImage',

    formSharing: serverURL + '/forms/shareForm',

    attachReferenceToForm: gridFSURL + '/gridFS/attachReferenceToForm',

    getAllAttachedReferenceOfForm: gridFSURL + '/gridFS/getAllAttachedReferenceOfForm',

    getDepartmentList : serverURL + '/accounts/getAllgrouplist',

    getAttachedReferenceOfForm: gridFSURL + '/gridFS/getAttachedReferenceOfForm',

    formcreationusingexcel: serverURL + '/forms/formCreationUsingExcel',

    getformInfo: serverURL + '/forms/getDownloadedFormInfo',

    getFormVersions : serverURL + '/forms/getVersions',

    importFormAsTemplate: serverURL + '/forms/importFormAsTemplate',

    addOrDeletePrepopRecords: serverURL + '/tasks/addOrDeletePrepopRecords',

    editSubmittedRecordWeb: serverURL + '/tasks/editSubmittedRecordWeb',

    fetchDownloadDetails: serverURL + '/reports/fetchDownloadDetails',

    downloadFile: serverURL + '/reports/downloadFile',

    getSketchingData : serverURL + '/records/getSketchingData',

    getDeptsForGA: serverURL + '/accounts/getAccountsForUser',

    getTasksModerator : serverURL + '/tasks/getPendingTasksOrRecords',

    getUsersByType: serverURL + '/users/getUsersByType',

    updateMapConfig : serverURL + '/configurations/updateMapType',

    fetchMapType : serverURL +'/configurations/getMapType',

    updateProfile : serverURL + '/users/profileUpdate',

    getadminslist : serverURL + '/admins/mappedAdmins',

    getPrivileges : serverURL + '/users/getPrivileges',

    setPrivileges : serverURL + '/users/setPrivileges',

    sketchingSkeleton : serverURL + '/forms/getSketchingFormSkeleton',

    getLicenses:  serverURL + '/licenses/getLicenses',

    insertLicenses :  serverURL + '/licenses/createLicenses',

    renewLicense: serverURL + '/licenses/renewLicenses',
    
    setConfig:serverURL + '/configurations/setConfig',

    getConfig: serverURL + '/configurations/getConfig',
    
    getDashboardData : serverURL + '/dashboards/getDashboardData',

    getApprovalsCount : serverURL + '/dashboards/getPendingDeviceAndTasks',

    createFormLink : serverURL + '/formLinks/createFormLink',

    linkExists: serverURL + '/formLinks/getFormLink',

    userLocations : serverURL + '/locations/fetchLocation',

    createDropdown :serverURL + '/forms/dynamicDropdownCollection',

    excelDropdown : serverURL + '/forms/convertExceltoJsonForDropdown',

    fetchDropdownCollections : serverURL + '/forms/fetchDropdownCollections',

    fetchDropdownCollectionData : serverURL + '/forms/fetchDropdownCollectionData',

    editDropdownCollectionRecord: serverURL + '/forms/editDropdownCollectionRecord',

    deleteDropdownCollectionRecord : serverURL + '/forms/deleteDropdownCollectionRecord',   

    fetchColumns :  serverURL + '/forms/fetchColumns',

    getDynamicFormData:  serverURL + 'forms/dynamicDropdown' ,

    getAppSettings:  serverURL + '/configurations/getSettings',

    updateVerionSetting: serverURL + '/configurations/updateSettings',

    resetSetting :serverURL + '/configurations/resetSettings',

    unlockUser :serverURL + '/users/unlockUser',

    getAttachmentsOfRecordId: gridFSURL +  '/gridFs/getAttachmentsOfRecordId',

    checkForWorflowUpdate: serverURL + '/workflowMangement/checkIfWorkflowIsActive',

    getVersionHistory : serverURL + '/configurations/getAppVersionDetails',
    
    updateAppVersionDetails : serverURL + '/configurations/updateAppVersionDetails',

    fetchClaimDoc : serverURL + '/claims/fetchClaimDocument',
    
    getAllLayers :serverURL + '/layer/layer',

    CreateLayers :serverURL + '/layer/create', 

    deleteLayer :serverURL + '/layer/delete',

    updateLayer :serverURL + '/layer/updateLayer',

    getLayerByName :serverURL + '/layer/getByLayerName',

    getLayersByTaskId :serverURL + '/layer/getExternalById',
};
export class allConstants {
    public static constantKeys = {
        _id:'_id',
        username:'username',
        email:'email',
        name:'name',
        lastname:'lastname',
        accounts:'accounts',
        departments:'departments',
        img:'img',
        privilege:'privilege',
        type:'type',
        phone:'phone',
        admins:'admins',
        label_Username :'Username',
        label_FirstName :'First Name',
        label_Contact :'Phone',
        label_Email:'Email',
        label_LastName :'Last Name',
        label_Image:'Select Avatar',
        clearAvatar:'Clear Avatar',
        label_Role:'Role',
        label_DA :'Account Administrator',
        label_GA  :'Group Administrator',
        label_Department:'Accounts',
        label_Privileges:'Privileges',
        label_Create:'Create',
        label_Update:'Update',
        label_Cancel:'Cancel',
        label_Back:'Back',
        header_Create:' New Administrator',
        header_Update:'Administrator',
        required_Username:'Username  required',
        required_Name:'First name  required',
        required_Phone:'Phone number required',
        required_Email:'Email  required',
        required_LastName:'Last name  required',
        required_Account:'Account  required',
        validation_Phone_MinL:'Phone number required atleast 10 characters',
        validation_Phone_MaxL:'Phone number required only 12 characters',
        validation_Email:'Email must be a valid email address',
        tab2_Content:'Set up your Role and Account',
        tab3_Content:'Set Privileges',
        startDate: 'startDate',
        endDate: 'endDate',
        // variables
        CreateUser: 'Create User',
        ChooseAvatar: 'Choose Avatar',
        changeAvtar:'Change Avatar',
        Accounts: 'Accounts',
        success: 'success',
        users: 'users',
        ToDate: 'To Date',
        FromDate: 'From Date',
        LastName:'Last Name',
        // Messages
        onlyNumbers: 'Only Numbers are allowed.',
        departmentRequired: 'Account required',
        todateRequired: 'To Date required',
        fromdateRequired: 'From Date required',
        // userslist table
        Activity: 'Activity',
        Username: 'Username',
        Date: 'Date',
        DeviceModel: 'Device model',
        Version: 'Version',
        // tab headings
        usersActivity: 'usersActivity',
        UsersList: 'Users List',
        // param
        userId: 'userId',
        creationTitle: 'Create Category',
        catNameLabel: 'Category Name',
        label_Description: 'Description',
        catNameCtrl: 'name',
        catDescCtrl: 'description',
        nameReqMsg: 'Category name required',
        usersRemove: 'usersRemove',
        GARemove: 'GARemove',
        moderator: 'moderator',
        description: 'description',
        label_Name: 'Account Name',
        label_Admins: 'Admins',
        label_Moderator: 'Moderators',
        label_GroupAdmins: 'Group Admins',
        label_Users: 'Users',
        label_Remove : 'Remove',
        required_AccName:'Account name  required',
        header_CreateAcc: 'Create Account',
        header_removeAdmins: 'Disassociation',
        fromdate: 'fromdate',
        todate: 'todate',
        tableFeilds : ['#', 'Manufacturer', 'Model', 'Platform', 'Version', 'App Version',  'UUID', 'Username', 'Status', 'Action'],
        deviceStatusList : ['All', 'Approved', 'Pending', 'Rejected', 'Suspended', 'Unauthorized'],
        tableActivityFeilds : ['#', 'Device Name', 'Action', 'Device Id', 'Date', 'Time'],
        deviceDeleteMessage : 'Do you want to Delete Device',
        approve: 'Approve',
        reject: 'Reject',
        suspende: 'Suspend',
        pending: 'Pending',
        revoke: 'Revoke',
        unauthorize: 'Unauthorize',
        approved: 'Approved',
        rejected: 'Rejected',
        suspended: 'Suspended',
        revoked: 'Revoked',
        unauthorized: 'Unauthorized',
        all: 'All',
        errorMsg: 'Something went wrong!',
        cancelMsg: 'Device Delete Action is Cancelled',
        successMsg: 'success',
        failedMsg: 'Failed',
        profile: 'Profile',
        mapConfiguration: 'Map',
        privileges: 'Privileges',
        configurations: 'Configurations',
        dropdown:'Reference List',
        security : 'Application Settings',
        emailTemplate: 'Email Template',
        account: 'accountId',
        mapSelect: 'mapType',
        accountLabel: 'Account',
        mapLabel: 'Map',
        mapTitle: 'Map Configuration',
        configTitle:'Configuration',
        accountSettings:'Account Settings',
        layerConfiguration: 'Layer Configuration',
        maps: [{ id: 'osm', name: 'Open Street Maps' }, { id: 'mapBox', name: 'Map Box' }, { id: 'googleMap', name: 'Google Maps' }],
        accountReqMsg:'Account required',
        adminReqMsg:'Admin required',
        privilegeTitle : 'Privileges',
        typeLabel :'Administrator Type',
        accountAdminLabel:'Admin',
        accountAdmin: 'adminId',
        organisationName:'organisationName',
        label_orgname:'Name',
        label_logo:'Logo',
        autoApproveDevice:'autoApproveDevice',
        label_autoApprove:'Auto-Approve Devices',
        tabs:{admins:'Administrator',
        forms: 'Formsz',
        projects: 'Projects',
        tasks: 'Tasks',
        templates: 'Templates',
        users: 'Users',
        workflow: 'Work Flows',
        dataloader:'Dataloader',
        gsalite:'GSA Lite',
        downloads : 'Downloads',
        devices : 'Device Management',
        category :' Categories',
        approvals:'Approvals',
        location:'Map Location'
        },
        selectDatatable:'Select Reference List',
        collectionName:'collectionName',
        dropdownNameLabel:'Reference list Name',
        uploadSheet:'Upload Excel Data',
        xlsxformat: 'Please attach xlsx formatted file only',
        options:'options',
        edit:'edit',
        create:'create',
        collectionNameRequired:'Name required',
        accountLock:'accountLock',
        lockInterval:'lockInterval',
        maxFilesAllowedPerRecord:'maxFilesAllowedPerRecord',
        maxSizeOfEachFileAllowedPerRecord:'maxSizeOfEachFileAllowedPerRecord',
        accountLockLabel:'Account Lock',
        lockIntervalLabel:'Lock Interval',
        parameter : 'Parameter',
        value : 'Value',
        Description : 'Description',
        accountDescription  : 'Number of attempts after which account will be locked',
        intervalDescription:'Minimum time locked after  unsuccessful attempts',
        filesDescription:'Maximum number of files allowed per record',
        sizeDescription:'Maximum size of each file allowed per record',
        isAccountLockEnabled:'Account Lock',
        category: 'category',
        groupAdmins: 'groupAdmins',
        layerExternalName: 'External Name', 
        layerInternalName: 'Internal Name', 
        layerUrl: 'Layer URL', 
        externalNameCtrl: 'externalName', 
        internalNameCtrl: 'internalName', 
        urlCtrl: 'layerUrl', 
        externalReqMsg: 'External name required', 
        internalReqMsg: 'Internal name required', 
        urlReqMsg: 'Url is required', 
        createLayer: 'Create Layer',
        tableLayerFields : ['#', 'External Name', 'Internal Name', 'Layer URL', 'Action'],    
        selectLayer:'selectLayer',
        Layer:'Layer',
        // Messages
        nameRequired: 'Name required',
        categoryRequired: 'Category required',
        groupadminRequired: 'Group Admin required',
        startdateRequired: 'Start date required',
        enddateRequired: 'End date required',
        workflowLevelRequired:'Workflow level required',
        // Variables
        CreateProject: 'Create Project',
        UpdateProject: 'Update Project',
        PreviewProject: 'Project Preview',
        Name: 'Name',
        Category: 'Category',
        GroupAdmin: 'Group Admin',
        AccountAdmin:'Account Admin',
        SetProjectDates: 'Set Project Dates',
        StartDate: 'Start Date',
        EndDate: 'End Date',
        // params
        projectId: 'projectId',
        formzCategory:'formzCategory',
        groupAdminId:'groupAdminId',
        SetTaskDates:'Set Task Dates',
        Dataloader:'Dataloader',
        Workflow:'Workflow',
        WorkflowLevel:'Workflow Level',
        workflowName:'workflowName',
        workflowLevel:'workflowLevel',
        AssignmentName:'Assignment name',
        Frequency_Label:'Frequency',
        Form_Label:'Form',
        form:'form',
        user:'user',
        Users_Label:'Users',
        formFrequency:'formFrequency',
        UploadSheet:'Upload Sheet',
        validFileMsg:'Please upload valid excel file',
        reqAssignName:'Assignment name required',
        editWorkAssignMent:'Edit Work Assignment',
        createWorkAssignMent:'Create Work Assignment',
        createTitle : 'Create Workflow',
        wfNameLabel: 'Workflow Name',
        nameReqErrMsg: 'Workflow Name required',
        wfNameCtrl: 'workflowname',
        wfListLabel: 'workflowList',
        updateTitle : 'Edit Workflow',
        wfLevelTitle: 'Workflow Level',
        wfFromLabel: 'From',
        wfToLabel: 'To',
        wfFromCtrl: 'from',
        wfToCtrl: 'to',
        alternativeMailid:'alternativeMailid',
        createdBy:'createdBy',
        department:'department',
        allocatedUsers:'allocatedUsers',
        workInstruction:'workInstruction',
        label_Formname:'Form Name',
        label_OwnerMail:'Owner Mail Id',
        label_Excel:'Design Form From Excel',
        label_Instructions:'Work Instructions',
        label_formType:'Form Type',
        label_formCat:'Form Category',
        label_AccName:'Owner Account Name',
        label_OwnerName:'Owner Name',
        label_Go:'Go',
        required_FormName:'Form name required',
        required_Users:'users are required',
        required_category:'Category selection required',
        formnameExists:'Form name already in use',
        Public:'Public',
        Private:'Private',
        nodataMsg:'No data found',
        filterAccountMsg:'Filtered results of Account:',
        formInfo:'Form Info',
        label_FormInfoName:'Form name',
        label_Createdby:'Created by',
        label_Createddate:'Creation date',
        noofassignments:'No. of assignments',
        noofCases:'No. of cases collected',
        lastModified:'Last form modified date',
        lastDownload:'Last downloaded date',
        lastDownloadby:'Last downloaded by',
        usersDownloaded:'No. of users downloaded',
        formcopyname:'formcopyname',
        shareToAccount:'Share To Account',
        label_Share:'Share',
        label_ShareLink:'Share Link',
        label_Generate:'Generate',
        label_Copy:'Copy',
        label_Validity:'Validity',
        label_Open:'Open',
        label_Close:'Close',
        validity:'validity',
        required_Validity:'Validity  required',
        formPreview:'Form Preview',
        label_Submit:'Submit',
        refTableAttachment:'Attached Files',
        Size:'Size',
        Actions:'Actions',
        References:'References',
        ShareForm:'Share Form',
        Link:'Link',
        Note:'Note',
        allocatedDepartments:'allocatedDepartments',
        label_Templatename:'Template name',
        label_TemplateType:'Template Type',
        selectCat:'Choose categories',
        required_TemplateName:'Template name required',
        templateExists:'Template name already in use',
        formname: 'formname',
        categories: 'categories',
        label_Categories:'Categories',
        excel :'excel',
        pdf : 'pdf',
        sendTo :'sendTo',
        sendCC:'sendCC',
        fileType : 'fileType',
        recordStatus:'Record Status',
        comments:'comments',
        assignedTo:'assignedTo',
        comments_validation : 'comments required',
        users_validation : 'User required',
        required_Pdf:'File type required',
        'Pending for review': 1,
        'Pending for review ': 1,
        'Approved':0,
        'Reassigned Record':2,
        'Reassigned Record ':2,
        fromDate:'fromDate',
        toDate:'toDate',
        status:'status',
        templatePreview:'Template Preview',
        // webLicensesLabel :'Web Licenses',
        licensesLabel:'Licenses',
        monthLabel :'Months',
        createLabel : 'Create',
        updateLabel : 'Update',
        cancelLabel :'Cancel',
        accountValue:'account',
        // adminLicenses:'webLicenses',
        // userLicenses:'mobileLicenses',
        // mobileLicenses:'mobileLicenses',
        licenses:'licenses',
        daysForRenewal:'numberOfDaysForRenewal',
        expiryDate:'expiryDate',
        tableList:{
            account:'Accounts',
            // webLicenses:'Admin Licenses',
            licenses:'Licenses',
            expiryDate:'Expiry Date',
            daysForRenewal :'Days For Renewal',
        },
        label_Properties:'Properties',
        label_Label:'Label',
        label_Minimum:'Minimum',
        label_Maximum:'Maximum',
        label_MinimumTime:'Minimum Time',
        label_MaximumTime:'Maximum Time',
        label_TimeInterval:'Time Interval',
        label_DefaultValue:'Default Value',
        placeholder_defaultValue:'Enter default value',
        label_PlaceHolder:'Place Holder',
        placeholder_PlaceHolder: 'Enter place holder',
        label_Size:'Size',
        label_MB:'MB',
        label_KB:'KB',
        label_TypeDate:'Select Type of Date',
        label_SystemDate:'System Date',
        label_ManualEntry:'Manual Entry',
        label_SetRules:'Set Rules',
        label_Required:'Required',
        label_GeoTagging:'Do you want to enable Geo tagging',
        label_ReadOnly:'Read Only',
        label_AllowMutliple:'Allow Multiple Selection',
        label_ReferenceList:'Choose reference list',
        label_ColumnName:'Choose reference field',
        label_AddNewValue:'Add New Value/Option',
        label_Add:'Add',
        saveandContinue:'Save and Continue',
        label_RemoveEntry:'Remove Entry',
        label_Undo:'Undo',
        label_Clear:'Clear',
        label_NumericFields:'Numeric Fields',
        label_Formula:'Formula',
        label_Sub:'SUB',
        label_Addition:'ADD',
        label_Mul:'MUL',
        label_Div:'DIV',
        label_Inv:'INV',
        label_Sno:'Sno',
        label_ChangeFieldType:'Do you want to change field type',
        label_AvailableType:'Available Types',
        label_selecte_change_type:'Select Change Type',
        label_selecte_change_type_hel:'You can change existing field type and fill properties',
        label_FormName1:'New Form Name',
        label_displayFields:'Display Fields',
        label_Continue:'Continue',
        label_No:'No',
        label_Filter:'Filter',
        label_Delete:'Delete',
        label_Unlock:'Unlock',
        label_Edit:'Edit',
        label_Preview:'Preview',
        label_resetPassword:'Reset Password',
        label_WorkAssignments:'Work Assignments',
        label_Submitted:'Submitted records',
        label_Refresh:'Refresh',
        label_StartDate:'Start date',
        label_EndDate:'End date',
        label_WorkflowStatus:'Workflow Status',
        label_PendingDays:'No of days pending',
        label_Accept:'Accept Task',
        label_Reject:'Reject Task',
        label_Accept_record:'Accept Record',
        label_Reject_record:'Reject Record',
        label_WF_record:'Workflow History',
        label_FileName:'File Name',
        label_Generated:'Generated On(MM/DD/YY H:MM)',
        label_FileSize:'Size Of File',
        label_downloadForm:'Downloaded From',
        header_Downloads:'Downloads',
        label_Download:'Download',
        label_TaskName:'Task Name',
        label_ToDate:'To Date (MM/DD/YY)',
        label_FromDate:'From Date (MM/DD/YY)',
        label_RecordType:'Type Of record',
        label_Disassociate:'Disassociate',
        label_GoToMap:'Go To Map',
        label_Save:'Save',
        label_form_create:'Create',
        label_form_update:'Update',
        label_ExportExcel:'Export to Excel',
        label_ExportEmail:'Export to Email',
        label_ExportPdf:'Export to Pdf',
        label_ReassignRecords:'Reassign Records',
        label_InsertedLocations:'Inserted Locations',
        label_AddColumns:'Add Columns',
        label_AddRecords:'Add Records',
        label_UpdateRecords:'Save Records',
        label_DeleteRecords:'Delete Records',
        label_Created:'Created On',
        label_Info:'Info',
        label_VersionHistory:'Version History',
        label_AttachReferences:'Attach References',
        label_Details:'Details',
        label_Tasks:'Tasks',
        label_Import:'Import',
        label_Pending:'Pending Records',
        label_Sketching:'Sketching',
        label_Reset:'Reset',
        label_Yes:'Yes',
        informationHeader:'Information',
        versionHeader:'Versions History',
        versionHistory:'Version History',
        changePassword:'Change password',
        currentPassword:'Current Password',
        newPassword :'New Password',
        mapLocationsHeader:'Map Locations',
        copyToClipboard:'Copy to clipboard',
        downloadTemplate:'Creation Template',
        importTemplate:'Import as template',
        headerMsg:'Click here to add Widets',
        displayFieldMsg:'Select display field',
        downloadsMsg:'Your Downloads will expire in 24Hrs.',
        minErrMsg:'Minimum required',
        reassignMsgRecord:'Please select a record to Re-assign',
        reassignRecord:'Reassigned Record',
        alreadyReassignMsg:'Some of the Records already Re-assigned',
        workflowStartedMsg:'WorkFlow started for this record',
        emailMsgRecord:'Please select the records to export to email',
        excelMsgRecord:'Please select the records to generate excel',
        pdfMsgRecord:'Please select the records to generate pdf',
        locationMsgRecord:'Please select the records to view on map',
        filterMsgRecord:'No records Available to Filter',
        noRecords:'No records found',
        submitRecordsUsersMsg:'Please submit the attached records to assign users',
        deleteRecordsMsg:'Please select record(s) to delete',
        saveMsgRecord:'Please select record(s) to save',
        cantReassignMsg:"Can't Re-Assign user as task start date already started",
        assignedMsg:"User added,save the records to assign",
        assignUsersMsg:'Please assign users',
        selectUserMsg:'Please select user',
        pendingRecordsMsg:'Pending records added successfully',
        applyFilterMsg:'No records to show for today, Please apply filters',
        noRowsMsg:'No records to show',
        loadingRecords:'loading...',
        noRecordsAttached:'No records attached',
        invalidFileMsg:'Please attach valid file',
        excelErrorMsg:"Excel not generated",
        excelNoteMsg:"NOTE: You can only export 1000 Records",
        pdfErrorMsg:"Pdf not generated",
        labelErrMasg:"Label name already exist's, please provide different name",
        maximumLengthErrMsg:'Maximum Length should be greater than Minimum',
        maximumTimeErrMsg:'Maximum Time should be greater than Minimum',
        invalidFormulaMsg:'Invalid formula',
        formulaEmptyMsg:"You didn't create any formula",
        addOperatorMsg:'Please add operator after previous operand',
        groupOperatorErrMSg:'We cant add group operatores in edit mode',
        groupOperatorNumberMsg:'Numbers are not allowed in group operators',
        addOperandsErrMsg:"Please add operands to ",
        groupOperatorMsg:" Group Opertor",
        addFieldPrevious:'please add field into previous opreation',
        groupOperatorMinErr:'Group Opertor should contain atleast 1 operands',
        groupOperatorMaxErr:'Group Opertor should contain only 2 operands',
        oneOperandErrMsg:' should contain only 1 operand',
        twoOperandsErrMsg:" Group Opertaor should contain atleast 2 operands",
        addOperandsMsg:'Please add operands',
        addOperandErrMsg:'Please add operand after previous operator',
        emptyFieldsErrMsg:'Cannot save empty fields',
        invalidEntryMsg:'Invalid Entry',
        createFormMsg:'Are you sure you want to create?',
        updateFormMsg:'Are you sure you want to update?',
        hardChangeMsg:'You have done several hard changes over the existing form, do you want to save them in new form?',
        copyFormMsg:'You can rename the copied form',
        deletedWidgetsList:'List of Deleted Widgets',
        deletedWidgetsMsg:'has been deleted',
        sessionExpired:'Session Expired',
        fileFormatMsg:'Please attach JPEG and PNG formatted image file only',
        serverErrMsg:'Something went wrong',
        versionHistoryMsg:'Please add release functionality list ',
        actionCancelled:' Action is Cancelled',
        deviceMsg:'Device ',
        dataErrMsg:'Unable to fetch data',
        mapViewMsg:'Please enable map view',
        geoTagMsg:'Geo tag not avilable',
        maxtimeLimitMsg:'Maximum Time limit reached',
        minTimeLimitMsg:'Minimum Time limit reached',
        mandatoryFieldsMsg:'Please fill all mandatory fields or check the validations',
        excelFormatMsg:'Please attach xlsx formatted file only',
        formLinkMsg:'Link Generated Successfully',
        attachmentFileMsg:'This file has been already attached.Please select other file',
        fileSizeMsg:'size exceeds 2MB',
        headerErrMsg:'Cannot add header in this level',
        headerEmpMsg:'Header/Table should contain atleast one field',
        formPropErrMsg:'Please fill field details at position',
        requiredFieldMsg:'Form should contain atleast one required field',
        derivedFieldsMsg:'A form should have atleast one dropdown or radio button field',
        derivedConditionApplyMsg:'Condition applied successfully',
        derivedConditionSetMsg:'Condition set successfully',
        derivedIncompleteMsg:'Please complete current process',
        licenseErrMsg:'Licenses cannot be 0',
        monthsErrMsg:'Months cannot be 0',
        appSettingsErrMsg:'Value cannot be 0',
        welcomeMsg:'Welcome',
        noReferenceList:'No Tables Found',
        emptyDataMsg:'Cannot submit empty data',
        mandatoryFillMsg:'Please fill Mandatory fields',
        emptyValuesMsg:'Cannot submit empty values',
        templateImportMsg:'Template imported successfully',
        selectFormValidFile:'Please select form and re-attach valid file',
        selectRowsMsg:'Please select record',
        selectOneRowMsg:'Please select only one record',
        selectARowMsg:'Please select a record',
        workflowErrMsg:'Please check levels,from & to cannot be same',
        saveWorkflowsMsg:'Please save the changes and then update',
        workflowCreatedMsg:'Workflow created successfully',
        workflowAddMsg:'Add atleast one Workflow',
        workflowAtleastMsg:'Should contain atleast one Workflow',
        workflowDeleteLevelMsg1:'Deleted level',
        workflowDeleteLevelMsg2:'.So from name of next level got adjusted',
        workFlowStartedMsg:"Cannot edit,WorkFlow started for this record",
        noSketchingMsg:"This record has no Sketching",
        rejectErrMsg:'Cannot reject for this User',
        pdfLimitMsg1:"Please select",
        pdfLimitMsg2:"Record(s) only",
        userLoggedInmsg:'User already logged in.Are you sure you want to continue ?',
        confirmActionMsg:'Confirm Action',
        forgetPwdMsg:"Just enter your Username below and we'll send password to your mail!",
        resetPasswordMsg :'Are you sure you want to reset password?',
        pwdChangedMsg:'Password changed to',
        forgotPwdHeader:'Forgot Passsword',
        signInHeader:'Sign In',
        signInAsHeader:'Sign In as',
        currentPwdMsg:'Please provide current password.',
        newPwdMsg:'Please provide new password.',
        pwdErrMsg:'Please enter correct password',
        patternInvalidMsg:'Pattern not valid',
        pwdMismatchMsg:'Password not matched.',
        createDateTable:'Create reference List',
        formValidityMsg:'Form link expires on ',
        recordUpdateMsg:'Updated successfully',
        assignCategoryMsg:'Please assign category to form',
        // onFileChange
        LoginId: 'Login Id',
        Email: 'Email',
        Phone: 'Phone',
        // variables
        ImportUsers: 'Import Users',
        uploadUserSheet: 'Upload File:',
        ShowTable: 'ShowTable',
        HideTable: 'HideTable',
        Upload: 'Upload',
        createTemplate:'Create Template:',
        // Table
        Sno: '#',
        LoginID: 'LoginID',
        Action: 'Action',
        // Messages
        Norecords: 'No records',
        validFile: 'User records are not available, please attach valid file',
        error: 'something went wrong',
        helpDesk:'Help Desk',
        dbStatistics:'Db Satistics',
        deviceApproval:'Device Approval',
        workflowApproval:'Workflow Approval',
        myProfile:'My Profile',
        changePwd:'Change Password',
        logOut:'Logout',
        toolTipAccounts:'Accounts',
        toolTipAdministrators:'Administrators',
        toolTipUsers:'Users',
        toolTipCategories:'Categories',
        toolTipTemplates:'Templates',
        toolTipForms:'Forms',
        toolTipProjects:'Projects',
        toolTipTasks:'Tasks',
        toolTipWorkflowManagement:'Workflow Management',
        toolTipApprovals:'Approvals',
        toolTipDownloads:'Downloads',
        toolTipLicenseManagement:'License Management',
        toolTipMapLocations:'Map Locations',
        toolTipSettings:'Settings',
        toolTipDataloader:'Dataloader',
        toolTipGSALite:'GSA Lite',
        details:'Details',
        pwdNote:'The password must contain atleast one lowercase letter, one uppercase letter, one numeric digit, one special character and length should be greater than 8 characters.'
    }
}
export class widgetProperties {
    public static widgets = {
        textBox : ['label','disabled','displayName','isRequired','minLength','maxLength','placeholder','defaultValue','typeChange','changeType'],
        number : ['label','disabled','displayName','isRequired','minLength','maxLength','placeholder','defaultValue','typeChange','changeType'],
        textArea : ['label','disabled','displayName','isRequired','minLength','maxLength','placeholder','defaultValue','typeChange','changeType'],
        camera :['label','isRequired', 'isGeotagginEnable'],
        video:['label','isRequired','videoDuration'],
        signature:['label','isRequired'],
        rating : ['label','displayName','isRequired','minimum','maximum','typeChange','changeType'],
        checkBox :['label','disabled','displayName','isRequired','options','typeChange','defaultValue','changeType'],
        radio :['label','disabled','displayName','isRequired','options','typeChange','defaultValue','changeType'],
        select :['label','disabled','displayName','isRequired','options','isAllowMultiselection','typeChange','defaultValue','changeType'],
        map : ['label','isRequired','disabled'],
        calendar:['label','minDate','maxDate','typeOfDateSelected','typeChange','defaultValue','changeType','isRequired','disabled'],
        calculation:['label','formula'],
        heading:['label','isRequired'],
        barcode:['label', 'isRequired'],
        time: ['label','disabled','isRequired','minTime','maxTime','timePeriod','placeholder'],
        properties : ['label'],
        referenceList:['label','disabled','displayName','isRequired','dynamicDropdownTable','columnName','isAllowMultiselection','typeChange','defaultValue','changeType'],
    }
}
export class widgetTypes {
    public static widgets = {
        textBox : 'textBox',
        textArea : 'textArea',
        number: 'number',
        camera : 'camera',
        video: 'video',
        rating: 'rating',
        checkBox: 'checkBox',
        radio: 'radio',
        select: 'select',
        map: 'map',
        calendar: 'calendar',
        calculation: 'calculation',
        header : 'heading',
        signature: 'signature',
        break:'break',
        barcode: 'barcode',
        table:'table',
        time:'time',
        properties:'properties',
        referenceList:'referenceList'
    }
   
}

export class widgetKeys {
    public static keys = {
        label: 'label',
        _id: 'id',
        disabled: 'disabled',
        placeholder: 'placeholder',
        options: 'options',
        optionDisplayName: 'displayValue',
        optionDisplayValue:'value',
        isRequired: 'isRequired',
        minLength: 'minLength',
        maxLength: 'maxLength',
        minimum:'minimum',
        maximum:'maximum',
        isAllowMultiselection: 'isAllowMultiselection',
        typeOfDateSelected: 'typeOfDateSelected',
        minDate: 'minDate',
        maxDate: 'maxDate',
        imageSize: 'imageSize',
        videoDuration: 'videoDuration',
        formula: 'formula',
        defaultValue:'defaultValue',
        breakOf: 'breakOf',
        typeChange: 'typeChange',
        isTable: "isTable",
        type:'type',
        minTime:'minTime',
        maxTime:'maxTime',
        timePeriod:'timePeriod',
        dynamicDropdownTable:'dynamicDropdownTable',
        columnName:'columnName',
        isGeotagginEnable: 'isGeotagginEnable',
        changeType:'changeType'
    }
    public static dataTypes = {
        object:'object',
        string:"string"
    }

    public static fieldTypes = {
        select: "select",
        heading: "heading",
        break: "break"
    }
}
export class dashboardConstansts {
    public static dashboardkeys = {
    selectionButtons:{
                        0:['Usage of System','Account Specific'],
                        1:['Account Specific','Projects','Tasks','Users','Device Management'],
                        3:['Projects','Tasks','Users'],
                        4:['Approvals'],
                        5:['Approvals','Tasks','Users'], 
                        6:['Usage of System','Account Specific','Status of System']   },
    description:{
      'Usage of System':'Provides a high-level analytics of system usage',
      'Account Specific':'Provides a high-level analytics of accounts',
      'Projects':'Provides a high-level analytics of projects',
      'Tasks':'Provides a high-level analytics of tasks',
      'Users':'Provides a high-level analytics of users',
      'Device Management':'Provides a high-level analytics of devices',
      'Status of System':'Provides a high-level analytics of system status',
      'Approvals':'Provides a high-level snalytics of approvals'
    },
    activeLicensesCount:'Active Licenses',
    transactionCount:'Transactions Per Sec',
    DaysForRenewalofLicensesCount:'Renewal Days',
    submittedRecordsCount:'Submitted Records',
    tasksCount:'Tasks',
    projectsCount:'Projects',
    inactiveUsersCount:'Inactive Mobile Users',
    activeUsersListArray:'Active Mobile Users',
    consumedLicensesList:'Consumed Licenses',
    formsCount:'Forms',
    recordsFeed:'Records Feed',
    username:'Username',
    aName:'Username',
    lastLoggedInTime:'LoggedInTime',
    departments:'Accounts',
    deviceDetails:'Device Details',
    assignedTo:'Name',
    loggedInTime:'LoggedInTime',
    department:'Account',
    statusOfTask:'Task Status',
    completedProjects:'Completed Projects',
    pendingProjectsCount:'Pending Projects',
    workAssignmentCounts:'WorkAssignments',
    totalprojects:'Projects',
    workAssignments:'WorkAssignments',
    activeUsersCount:'Active Users',
    userCount:'Users',
    activeUserList:'Active UserList',
    completedTasks:'Completed Tasks',
    pendingTasksCount:'Pending Tasks',
    accountsCount:'Accounts',
    pendingDevicesCount:'Pending Devices',
    totalDevices:'Devices',
    dbSize:'DB Size(MB)',
    deviceCount :'Devices',
    logFileSize:'LogFileSize(MB)',
    middleWareServers:'MiddleWare Servers',
    accountspecific:'admins',
    projects:'projects',
    tasks :'tasks',
    users:'users',
    account:'Accounts',
    devicemanagement:'devices',
    approvals:'approvals',
    Completed:'Completed',
    'workflow Cycle Started':'Workflow Cycle Started',
    New:'New',
    'In progress':'In Progress',
    androidDevicesCount:'Android Devices',
    macDevicesCount:'Mac Devices',
    pendingTasks:'Pending Tasks',
    endDate:'End Date',
    startDate:'Start Date',
    name:'Task Name',
    projectTasksCount:'Tasks Count',
    apName:'Project Name',
    completedProjectsList:'Completed ProjectsList',
    lockedAccountUser:'Locked Users',
    accountLockedOn:"Account LockedOn",
    label_Close:'Close',
    Actions:'Actions',
    toggleFullScreen:'Toggle FullScreen',
    label_Delete:'Delete'
  }
  }
  
export const autoCompleteField = 'off';
export const autoCompleteForm = 'off';

export const autoCompleteFbField = 'off';
export const autoCompleteFbForm = 'off';

export const formExitMsg = "Your unsaved changes will be lost. Do you wish to continue?";

export const  restPassword = 'mm@1234';

