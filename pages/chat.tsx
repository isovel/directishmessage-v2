import React, { ReactNode, Component } from 'react';
import DXMHead from '../components/DXMHead';

import User from '../classes/User';

import styles from '../styles/Chat.module.css';

// <div ${v.special ? 'id="' + v.special + '" ' : ''}class="message${v.system?' system-message':''}${v.admin?' admin-message':''}">
//     <span class="message-author" title="${v.timestamp}">${v.author}</span>
//     <span class="message-content">${v.content}</span>
// </div>

class Message extends Component {
    author: User
    content: string
    id: string

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render(): ReactNode {
        return(
            <div className={'message'}>
                <span className={'messageAuthor'}>{this.author.username}</span>
            </div>
        )
    }
}

export default class Chat extends Component {
    componentDidMount() {
        if (window.location.host != 'dm.isota.ch') {
            document.querySelector('html').classList.add('development');
        }
    }

    render() {
        return(
            <div>
                <DXMHead title={'chat'}/>
                <div className={styles.contentContainer}>
                    <div className={styles.messageContainer}>
                        <div className={[styles.message, styles.systemMessage].join(' ')}>
                            <span className={styles.messageAuthor}>SYSTEM</span>
                            <span id={'loading'} className={styles.messageContent}>Loading...</span>
                        </div>
                    </div>
                    <div className={styles.textBoxContainer}>
                        <input className={styles.textBox} placeholder={'Send them a message 🔪'} type={'textbox'} />
                    </div>
                </div>
            </div>
        );
    }
}