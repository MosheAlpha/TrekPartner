export interface Trek {
    name: string,
    description: string,
    location: string,
    length: string
}

export interface Comment {
    title: string,
    content: string,
}

export interface registerForm {
    username: string,
    password: string,
    password2: string,
    email: string,
    first_name: string,
    last_name: string
}