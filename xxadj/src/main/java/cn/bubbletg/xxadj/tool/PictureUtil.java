package cn.bubbletg.xxadj.tool;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;

/**
 * 
 * @author tg_z 此类为文字识别
 */
@Controller
public class PictureUtil {

	public static String request(String httpUrl, String httpArg) {
		BufferedReader reader = null;
		String result = null;
		StringBuffer sbf = new StringBuffer();
		try {
			// 用java JDK自带的URL去请求
			URL url = new URL(httpUrl);
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			// 设置该请求的消息头
			// 设置HTTP方法：POST
			connection.setRequestMethod("POST");
			// 设置其Header的Content-Type参数为application/x-www-form-urlencoded
			connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			// 填入apikey到HTTP header
			connection.setRequestProperty("apikey", "uml8HFzu2hFd8iEG2LkQGMxm");
			// 将第二步获取到的token填入到HTTP header
			connection.setRequestProperty("access_token", baiduOcr.getAuth());
			connection.setDoOutput(true);
			connection.getOutputStream().write(httpArg.getBytes("UTF-8"));
			connection.connect();
			InputStream is = connection.getInputStream();
			reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));

			String strRead = null;
			while ((strRead = reader.readLine()) != null) {

				// sbf.append("Content-Type: application/json;charset=UTF-8");
				sbf.append(strRead);
				sbf.append("\r\n");
			}
			reader.close();
			result = sbf.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	// 把json格式转换成HashMap
	public static HashMap<String, String> getHashMapByJson(String jsonResult) {
		HashMap<String, String> map = new HashMap<String, String>();
		try {
			JSONObject jsonObject = JSONObject.parseObject(jsonResult.toString());
			JSONObject words_result = jsonObject.getJSONObject("words_result");
			Iterator<String> it = words_result.keySet().iterator();

			while (it.hasNext()) {
				String key = it.next();
				JSONObject result = words_result.getJSONObject(key);
				String value = result.getString("words");
				switch (key) {
				case "姓名":
					map.put("name", value);
					break;
				case "民族":
					map.put("nation", value);
					break;
				case "住址":
					map.put("address", value);
					break;
				case "公民身份号码":
					map.put("IDCard", value);
					break;
				case "出生":
					map.put("Birth", value);
					break;
				case "性别":
					map.put("sex", value);
					break;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}

	@RequestMapping("/shenfengzheng")
	public ModelAndView shenfengzheng(HttpServletRequest request, HttpServletResponse response,
			MultipartFile pictureFile, int fan) throws IOException {
		response.setContentType("text/html;charset=UTF-8");
		// 获得文件名
		String pictureFile_name = pictureFile.getOriginalFilename();
		String path = request.getSession().getServletContext().getRealPath("") + "images\\shenfenzheng\\"
				+ pictureFile_name;
		// 上传图片到路径
		File uploadPic = new java.io.File(path);

		if (!uploadPic.exists()) {
			uploadPic.mkdirs();
		}
		// 向磁盘写文件
		pictureFile.transferTo(uploadPic);

		/**
		 * 判断正反面 fan = 1 为反面 fan = 0 为正面
		 */
		if (fan == 0) {
			// 获取本地的绝对路径图片
			File file = new File(path);
			// 进行BASE64位编码
			String imageBase = BASE64.encodeImgageToBase64(file);
			imageBase = imageBase.replaceAll("\r\n", "");
			imageBase = imageBase.replaceAll("\\+", "%2B");

			// 百度云的文字识别接口,后面参数为获取到的token
			String httpUrl = "https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=" + baiduOcr.getAuth();
			String httpArg = "detect_direction=true&id_card_side=front&image=" + imageBase;
			String jsonResult = request(httpUrl, httpArg);
			System.out.println("返回的结果--------->" + jsonResult);
			HashMap<String, String> map = getHashMapByJson(jsonResult);
			Collection<String> values = map.values();
			response.getWriter().print(map.get("name"));
			response.getWriter().print("-");
			response.getWriter().print(map.get("IDCard"));
			response.getWriter().print("-");
			response.getWriter().print(map.get("Birth"));
			Iterator<String> iterator2 = values.iterator();
			while (iterator2.hasNext()) {
				System.out.print(iterator2.next() + ", ");
			}
		}
		return null;
	}
}