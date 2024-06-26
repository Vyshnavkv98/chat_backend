import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
import { configDotenv } from "dotenv";
configDotenv()

const parseCookies = (cookieString) => {
	const cookies = {};
	cookieString.split(';').forEach(cookie => {
	  const [name, ...rest] = cookie.split('=');
	  cookies[name.trim()] = decodeURI(rest.join('='));
	});
	
	return cookies.my_custom_jwt;
  };

const protectRoute = async (req, res, next) => {
	try {
		console.log(req.cookies,req.headers);
		const token =parseCookies(req.headers.cookie);


		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// console.log(decoded);
		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;