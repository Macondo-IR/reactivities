using Application.Core;
using Domain.SimpleSbss;
using MediatR;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.BillingBases
{
    public class SearchByCustomerNumber
    {

        public class Query : IRequest<Result<BillingBase>> {
            public string FldCustomerNumber { get; set; }

        }
        public class Handler : IRequestHandler<Query, Result<BillingBase>>
        {
            private readonly SimpleSbssContext _context;

            public Handler(SimpleSbssContext context)
            {
                _context = context;
            }

            public async Task<Result<BillingBase>> Handle(Query request, CancellationToken cancellationToken)
            {
                SqlParameter param = new SqlParameter()
                {
                    ParameterName = "@p",
                    SqlDbType = System.Data.SqlDbType.NVarChar,
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.FldCustomerNumber
                };
                var result = await _context.tbBillingBase.FromSqlRaw("EXECUTE dbo.GetIdentification  @p=@param", param).FirstOrDefaultAsync();

                return Result<BillingBase>.Success( result);

             }
        }

    }

}
