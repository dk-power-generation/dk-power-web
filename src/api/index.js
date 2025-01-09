/***************************************
 *DATA SERVICE PROJECT
****************************************/
import * as fileServiceFunctions from './data-service/file-service';
import * as valueServiceFunctions from './data-service/ValueService';

export const fileService = fileServiceFunctions;
export const valueService = valueServiceFunctions;
/***************************************
 *OLD PID PROJECT
****************************************/
export * as oldFileService from './old-pid-project/file-service';