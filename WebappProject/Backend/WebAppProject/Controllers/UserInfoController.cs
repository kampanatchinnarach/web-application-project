using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAppProject.Models;
using WebAppProject.Data;
using System.Drawing;
using System.IO;


namespace WebAppProject.Controllers
{

    [Route("api/userInfo")]
    [ApiController]
    public class UserInfoController : ControllerBase
    {
        private readonly ApplicationDBContext _configuration;
        private readonly IWebHostEnvironment _env;
        public UserInfoController(ApplicationDBContext configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            IEnumerable<UserInfo> userInfo = _configuration.UserInfomation;

            return new JsonResult(userInfo);
        }

        [Route("getUserInfo")]
        [HttpPost]
        
        public JsonResult GetUserInfo(UserInfo userInfo)
        {
            return new JsonResult(_configuration.UserInfomation.Find(userInfo.StudentId));
        }

        [HttpPost]
        
        public JsonResult Post(UserInfo userInfo)
        {
            var obj = _configuration.UserInfomation.Find(userInfo.StudentId);
            
            if (userInfo.FirstName == "login")
            {
                if (obj.StudentId == userInfo.StudentId && obj.Password == userInfo.Password) 
                {
                    return new JsonResult(userInfo.StudentId);
                }
                return new JsonResult("Login Fail");
            }
            else
            {
                if (obj != null) {
                    return new JsonResult("Have this StudentId in Data");
                }
                _configuration.UserInfomation.Add(userInfo);
                _configuration.SaveChanges();
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(UserInfo userInfo)
        {
            var obj = _configuration.UserInfomation.Find(userInfo.StudentId);
           
            if(obj == null) {
                return new JsonResult("Put Fail");
            }
            if (userInfo.FirstName != "")
            {
                obj.FirstName = userInfo.FirstName;
            }
            if (userInfo.LastName != "")
            {
                obj.LastName = userInfo.LastName;   
            }
            if (userInfo.PaymentBank != "")
            {
                obj.PaymentBank = userInfo.PaymentBank;
            }
            if (userInfo.PaymentNumber != "")
            {
                obj.PaymentNumber = userInfo.PaymentNumber;
            }
            if (userInfo.PhoneNumber != "")
            {
                obj.PhoneNumber = userInfo.PhoneNumber;
            }
            if (userInfo.UserPhotosName != "")
            {
                obj.UserPhotosName = userInfo.UserPhotosName;
            }
            if (userInfo.PaymentPhotosName != "")
            {
                obj.PaymentPhotosName = userInfo.PaymentPhotosName;
            }
            _configuration.UserInfomation.Update(obj);
            _configuration.SaveChanges();
            return new JsonResult("Put Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(string? id)
        {
            if (id == null)
            {
                return new JsonResult("Delete Fail");
            }
            var obj = _configuration.UserInfomation.Find(id);
            if (obj == null)
            {
                return new JsonResult("Delete Fail");
            }
            _configuration.UserInfomation.Remove(obj);
            _configuration.SaveChanges();
            return new JsonResult("Delete Successfully");

        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/"+filename;
                System.IO.File.Delete(physicalPath);  
                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                
                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.png");
            }
        }
    }
}
