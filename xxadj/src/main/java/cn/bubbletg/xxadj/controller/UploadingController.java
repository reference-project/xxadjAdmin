package cn.bubbletg.xxadj.controller;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;


import cn.bubbletg.xxadj.tool.BASE64;

@Controller
public class UploadingController {

	/**
	 * 身份证上传
	 * 
	 * @throws IOException
	 * @throws IllegalStateException
	 */
	@RequestMapping("/identityCardUploading")
	public String identityCardUploading(HttpServletRequest request, MultipartFile pictureFile)
			throws IllegalStateException, IOException {
		// 原始文件名称

		// 获得文件名
		String pictureFile_name = pictureFile.getOriginalFilename();
		// 获得路径
		String path = request.getSession().getServletContext().getRealPath("") + "images\\shenfenzheng\\"
				+ pictureFile_name;

		// 上传图片到路径
		File uploadPic = new java.io.File(path);

		if (!uploadPic.exists()) {
			uploadPic.mkdirs();
		}
		// 向磁盘写文件
		pictureFile.transferTo(uploadPic);

		// 获取本地的绝对路径图片
		File file = new File(path);
		// 进行BASE64位编码
		String imageBase = BASE64.encodeImgageToBase64(file);
		imageBase = imageBase.replaceAll("\r\n", "");
		imageBase = imageBase.replaceAll("\\+", "%2B");

		// 重定向
		return "redirect:shenfengzheng?imageBase=" + imageBase;
	}
}
