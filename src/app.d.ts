interface User {
	id: string,
	name: string,
	email: string,
}

interface Tweet {
	id: number,
	content: string | null,
	likedBy: string | any[]; 
	author: { 
		id: string
		name: string
	} ,
	_count:any
}

/// <reference types="@sveltejs/kit" />
declare namespace App {
	interface Locals {
		user : User | string | JwtPayload | null,
		Tweet : Tweet
	}
	// interface Platform {}
	interface Session {
		user : User | string | JwtPayload | null,
	}
	// interface Stuff {}
	
}

declare namespace NodeJS {
  export interface ProcessEnv {
    BASE_URL: string;
    JWT_PRIVATE_KEY:string
    JWT_REFRESH_PRIVATE_KEY:string
    JWT_TOKEN_EXPIRE_TIME:string
    JWT_REFRESH_TOKEN_EXPIRE_TIME:string
    JWT_FORGOT_TOKEN_EXPIRE_TIME:string
    MAILER_USER:string
    MAILER_PASS:string
    MAILER_SERVICE:string
  }
}