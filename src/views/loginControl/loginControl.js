import React from 'react';
import { Link } from 'react-router-dom'
import { Register, ForgetPwd } from "../../views";
import './style.scss';
import bigBg from '../../assets/default/bigBg.png';

class LoginControl extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    toIndex() {
        this.props.history.push('/')
    }
    renderPage = () => {
        switch (this.props.match.path) {
            // 注册
            case '/register': {
                return <Register {...this.props} />;
            }
            // 忘记密码
            case '/forgetPwd': {
                return <ForgetPwd {...this.props} />
            }
        }
    }

    render() {

        return (
            <div className="loginControl_wrapper">
                <div className="header_wrap">
                    <div className="header oneLineBetween">
                        <div className="company hand" onClick={this.toIndex.bind(this)}>Yue's react project shell
</div>
                        <div className="rightState">已有账号，<span className="blue"><Link to="/signIn">立即登录</Link></span></div>
                    </div>
                </div>
                <img className='bigBg' src={bigBg} />
                {/* <div className="mainBox">
                </div> */}
                {this.renderPage()}

            </div >
        );
    }

};


export default LoginControl;