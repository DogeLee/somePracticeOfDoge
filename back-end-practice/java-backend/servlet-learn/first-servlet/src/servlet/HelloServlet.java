package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "servlet", urlPatterns = { "/servlet" })

//�̳���HttpServlet
public class HelloServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html;charSet=utf-8");
		System.out.println("����get����");
		PrintWriter out = response.getWriter();
		out.write("get���󷵻سɹ�");
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html;charSet=utf-8");
		System.out.println("����post����");
		PrintWriter out = response.getWriter();
		
		String msg;
		try{
			msg = request.getParameter("msg");
			out.write(msg);
		}
		catch(Exception ex){
			ex.printStackTrace();
			out.write("��������������");
		}	
	}
}
