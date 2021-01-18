export class objcetKeyConstants {

    public static taskListKeys = {
        assignmentId: '_id',
        assignmentName: 'name',
        taskId: 'taskId',
        taskName: 'taskName',
        status: 'status',
        assignedBy: 'createdBy',
        dueDate: 'endDate',
        projectId: 'projectId',
        startDate: 'startDate',
        formId: 'formId'
    };
    public static historyRecordsList = {
      formName: 'formName',
      _id: '_id',
      status: 'status',
      submittedBy: 'submittedBy',
      displaykey: 'displaykey',
      submittedTime: 'submittedTime',
      formId: 'formId',
      assignmentId: '_id',
      taskId: 'taskId',
      recordId: 'recordId'
    };
  public static formsListKeys = {
    formName: 'name',
    _id: '_id'
  };

  public static formInfoKeys = {
    createdBy: 'createdBy',
    formName: 'name',
    description: 'description'
  };

  public static workOrdersList = {
    formName: 'formName',
    _id: '_id',
    status: 'status',
    submittedBy: 'submittedBy',
    displaykey: 'displayField',
    submittedTime: 'submittedTime',
    formId: 'formId',
    assignmentId: '_id',
    taskId: 'taskId',
    recordId: '_id'
  };
}
