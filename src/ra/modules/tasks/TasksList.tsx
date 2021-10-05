import {
    List,
    Datagrid,
    TextField,
    ChipField,
} from 'react-admin';

export const TasksList = (props: any) => (
    <List {...props} title = "My Tasks">
        <Datagrid rowClick="show" >
            <TextField source="title" label="Task" />
            <ChipField source="type" label="Type"/>
            <ChipField source="status" label="Status"/>
        </Datagrid>
    </List>
);
