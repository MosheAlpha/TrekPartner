export interface Trek {
    name: string,
    description: string,
    location: string,
    length: string, 
    image: string
}

export interface Comment {
    title: string,
    content: string,
}

export class MyComment {
    title: string;
    content: string;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }
}

export interface registerForm {
    username: string,
    password: string,
    password2: string,
    email: string,
    first_name: string,
    last_name: string
}
