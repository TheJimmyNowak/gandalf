use std::net::TcpListener;
use std::net::TcpStream;
use std::fs;
use std::io::prelude::*;

fn main() {
    let listener = TcpListener::bind("0.0.0.0:8000").unwrap();

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        handle_connection(stream);
    }
}

fn handle_connection(mut stream: TcpStream) {
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();

    println!("a");
    for i in buffer {
        print!("{}", i);
    }

    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}
