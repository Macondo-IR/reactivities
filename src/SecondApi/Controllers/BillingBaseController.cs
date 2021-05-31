using Application.BillingBases;
using Domain.SimpleSbss;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecondApi.Controllers
{
    public class BillingBaseController : BaseApiController
    {

   
        [HttpGet("{name}")]
        public async  Task<ActionResult<BillingBase>> Get(string name)
        {
            return HandleResult(await Mediator.Send(new SearchByCustomerNumber.Query { FldCustomerNumber = name }));

        }


    }
}
