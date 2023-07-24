/**
 * 验证码类型声明
 */
export interface Captcha {
    Img: string;
}

export interface LoginFormData {
    username: string;
    password: string;
    code: string;
    phone: string;
}

/**
 * 登录响应类型声明
 */
export interface LoginResponseData {
    access_token: string;
    token_type: string;
}



/**
 * 登录用户类型声明
 */
export interface UserInfo {
    Name: string;
    avatar: string;
    Roles: string[];
    perms: string[];
    HeadImg: string;
    Remark: string;

}