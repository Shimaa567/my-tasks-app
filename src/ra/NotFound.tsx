import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';

export const NotFound = () => (
    <Card>
        <Title title="Not Found" />
        <CardContent>
            <h1>404</h1>
            <p>Wrong Route</p>
        </CardContent>
    </Card>
);
