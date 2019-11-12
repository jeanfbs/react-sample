import React, { Component } from 'react'
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

const {
    PUBLIC_URL,
    REACT_APP_PORTAL_WEB: PORTAL_WEB
} = process.env;

const NotFound = () =>(
    <Container>
        <Row>
            <Col sm={12} className="text-center">
                <img src={ PUBLIC_URL + "/img/sad404.svg"} alt="404" width="200"/>
                <h1 style={{fontSize: '102px'}}>404</h1>
                <p style={{fontSize: '36px'}}>
                    Página não encontrada!
                </p>
            </Col>
        </Row>
    </Container>
)

export default NotFound;