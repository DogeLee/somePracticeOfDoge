package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "servlet", urlPatterns = { "/servlet" })

//继承于HttpServlet
public class HelloServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html;charSet=utf-8");
		System.out.println("处理get请求");
		PrintWriter out = response.getWriter();
		out.write("get请求返回成功");
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html;charSet=utf-8");
		System.out.println("处理post请求");
		PrintWriter out = response.getWriter();
		
		String msg;
		try{
			msg = request.getParameter("msg");
			out.write(msg);
		}
		catch(Exception ex){
			ex.printStackTrace();
			out.write("服务器发生错误");
		}	
	}
}
