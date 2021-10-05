import {
    ShowView,
    ChipField,
    TextField,
    TabbedShowLayout,
    ShowController,
    Tab,
} from 'react-admin';

const TaskTitle = (props: any) => {
    return <span>{props.record ? `${props.record.title}` : ''}</span>;
};

export const ShowTask = (props: JSX.IntrinsicAttributes) => (
    <ShowController {...props} >
        {(controllerProps: any) =>
            <ShowView {...props} {...controllerProps} title={<TaskTitle />} >
                <TabbedShowLayout>
                    <Tab label="General">
                        <ChipField label="Task Type" source="type" />
                        <TextField source="title" />
                        <TextField source="description" />
                    </Tab>
                </TabbedShowLayout>
            </ShowView>
        }
    </ShowController>
);
