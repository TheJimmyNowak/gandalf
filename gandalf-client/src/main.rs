use std::net::UdpSocket;
use std::str;

fn main() {
    let connection_string:String = String::from("0.0.0.0:8000");

    let socket = connect(connection_string);
    handle_communication(socket);
}

fn connect(connection_string: String) -> UdpSocket {
    let socket = match UdpSocket::bind(connection_string) {
        Ok(s) => s,
        Err(e) => panic!("{}", e)
    };
    socket
}

fn handle_communication(socket: UdpSocket) {
    let mut buf = [0; 2048];

    loop {
        let msg = match socket.recv_from(&mut buf) {
            Ok((amt, src)) =>{ 
                str::from_utf8(&buf[..amt]).unwrap_or("")
            }
            Err(e) => {
                println!("couldn't recieve a datagram: {}", e);
                "a"
            }
        };

        let msg: Vec<&str>= msg.split_whitespace().collect();
        let command = msg[0];
        let url = msg[1];

        match command {
            "web" => {
                println!("Czuwaj to stara kurwa");
            },
            _ => {
            }
        }
    }
}
