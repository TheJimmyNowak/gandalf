use std::net::UdpSocket;
use std::str;
use std::io;
use webbrowser;


fn main() {
    let connection_string:String = String::from("0.0.0.0:8000");
    let socket = connect(connection_string)
        .expect("Cannot connect bind to port");

    handle_communication(socket)
        .map_err(|err| println!("{:?}", err)).ok(); 
}

fn connect(connection_string: String) -> Result<UdpSocket, io::Error> {
    let socket =  UdpSocket::bind(connection_string)?; 
    Ok(socket)
}

fn handle_communication(socket: UdpSocket) -> std::io::Result<()> {
    loop {
        let mut buf = [0; 2048];
        let (amt, src) = socket.recv_from(&mut buf)?; 
        let msg = str::from_utf8(&buf[..amt]).unwrap_or("");
        

        println!("{}", msg);

        let msg: Vec<&str>= msg.split_whitespace().collect();

        let command = msg[0];
        let url = msg[1];
        
        match command {
            "web" => {
                if !webbrowser::open(url).is_ok() {
                    panic!("Cannot open a webbrowser");
                }
            },
            _ => {
            }
        }
    }
}
