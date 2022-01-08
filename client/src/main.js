import { io } from "socket.io-client";
import fromClient from "../communications/fromClient.js"
import fromServer from "../communications/fromServer.js"

var socket = io();

fromClient(socket)
fromServer(socket)