import {
    EditView,
    FormTab,
    TabbedForm,
    TextInput,
    RadioButtonGroupInput,
    TabbedFormTabs,
    EditController,
}
    from 'react-admin';

import {
    choices,
    required,
    minLength,
    maxLength
} from 'react-admin';
import { Grid } from '@material-ui/core';

const validateTitle = [required(), minLength(10), maxLength(50)];
const validateDescription = [required(), minLength(5)];

const TaskTitle = (props: any) => {
    return <span>{props.record ? `${props.record.title}` : ''}</span>;
};

export const EditTask = (props: JSX.IntrinsicAttributes) => (
    <EditController {...props} >
        {(controllerProps: any) =>
            <EditView {...props} {...controllerProps} title={<TaskTitle />} >
                <TabbedForm redirect="show" tabs={<TabbedFormTabs scrollable="true" />} warnWhenUnsavedChanges>
                    <FormTab label="summary">
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={{ width: '100%' }}
                        >
                            <Grid
                                item
                                lg={12}
                                sm={12}
                                xl={12}
                                xs={12}
                            >
                                <RadioButtonGroupInput
                                    validate={[required("Please Specify the type of the task"), choices(['personal', 'work'])]}
                                    source="type"
                                    defaultValue="personal"
                                    choices={[
                                        { id: 'personal', name: 'Personal Task' },
                                        { id: 'work', name: 'Work Task' }
                                    ]} />
                            </Grid>
                            <Grid
                                item
                                lg={6}
                                sm={6}
                                xl={6}
                                xs={12}
                            >
                                <TextInput label="Task Title" validate={validateTitle} source="title" />
                            </Grid>
                            <Grid
                                item
                                lg={6}
                                sm={6}
                                xl={6}
                                xs={12}
                            >
                                <TextInput label="Task Description" validate={validateDescription} source="description" />
                            </Grid>
                        </Grid>
                    </FormTab>
                </TabbedForm>
            </EditView>
        }
    </EditController>
);