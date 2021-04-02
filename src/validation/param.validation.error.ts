/**
 * Error class to help provide a somewhat similar shape between validation errors on function parameters and validation errors on class properties.
 */
export class ParamValidationError {

    public readonly constraints: {
        [type: string]: string
    };

    public readonly value: any;

    constructor(validationId: string, errorMessage: string, param: any) {
        this.constraints = {
            [validationId]: errorMessage
        };
        this.value = param;
    }
}
