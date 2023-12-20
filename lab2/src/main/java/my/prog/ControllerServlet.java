package my.prog;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // TOO IMPORTANT BECAUSE LATER IT WILL BE BREAKING UP
//        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html; charset=UTF-8");

        String path = req.getServletPath();
        switch (path) {
            case "/shoot" -> {
                RequestDispatcher dispatcher = req.getRequestDispatcher("AreaCheckServlet");
                dispatcher.forward(req, resp);
            }
            case "/table" -> {
                getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
            }
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // TOO IMPORTANT BECAUSE LATER IT WILL BE BREAKING UP
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html; charset=UTF-8");

        String path = req.getServletPath();
        switch (path) {
            case "/shoot":
            case "": {
                Shot[] shots = (Shot[])req.getSession().getAttribute("shots");
                req.setAttribute("shots", shots);
                getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
                break;
            }
            case "/table": {
                getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
                break;
            }
            case "/clear": {
                getServletContext().getRequestDispatcher("/clear").forward(req, resp);
                break;
            }
        }
    }

}
