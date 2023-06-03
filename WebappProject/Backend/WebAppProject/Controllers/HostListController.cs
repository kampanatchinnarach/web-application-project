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


namespace WebAppProject.Controllers
{
    [Route("api/hostList")]
    [ApiController]
    public class HostListController : ControllerBase
    {
        private readonly ApplicationDBContext _configuration;
        public HostListController(ApplicationDBContext configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]
        public JsonResult Get()
        {
            IEnumerable<HostList> hostList = _configuration.HostLists;

            return new JsonResult(hostList);
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Post(HostList hostList)
        {
            _configuration.HostLists.Add(hostList);
            _configuration.SaveChanges();
            return new JsonResult(hostList.Id);
        }

        [HttpPut]
        public JsonResult Put(HostList hostList)
        {
            var obj = _configuration.HostLists.Find(hostList.Id);
            if (obj == null)
            {
                return new JsonResult("Put Fail");
            }
            if (hostList.Order != "")
            {
                if (obj.Order == "")
                {
                    obj.Order = hostList.Order;
                }
                else
                {
                    obj.Order += ',' + hostList.Order;
                }  
            }
            if(obj.NowNum + hostList.NowNum <= obj.MaxNum)
            {
                obj.NowNum += hostList.NowNum;
            }
            else
            {
                return new JsonResult("Order is Fully");
            }
            if (hostList.Status != "")
            {
                obj.Status = hostList.Status;
            }
            _configuration.HostLists.Update(obj);
            _configuration.SaveChanges();
            return new JsonResult("Put Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int? id)
        {   
            
                if (id == null)
                {
                    return new JsonResult("Delete Fail");
                }
                var obj = _configuration.HostLists.Find(id);
                if (obj == null)
                {
                    return new JsonResult("Delete Fail");
                }
                _configuration.HostLists.Remove(obj);
                _configuration.SaveChanges();
                return new JsonResult("Delete Successfully");
            
        }
    }
}
