import React, {Component, ReactNode} from 'react';
import Head from 'next/head';

export default class DXMHead extends Component {
    props = {
        title: undefined
    }
    constructor(props) {
        super(props);
        this.props.title = props.title;
    }
    render(): ReactNode {
        return <><Head>
            <title>{this.props.title ? `${this.props.title} — ` : ''}dxm-rewrite</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head></>;
    }
}
