
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TockenService : ITockenService
    {
         //one Used to both encript and decript electronic information. 
         // Assymmetric key is used public key and private used to encript and decript
         // ex. ssl and https
        private readonly SymmetricSecurityKey _key; 
           
        public TockenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Tokenkey"]));
        }

        public string CreateTocken(AppUser user)
        {
            // Adding our Claim.
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };
            //Creating some Credentials
            var creds = new SigningCredentials(_key,SecurityAlgorithms.HmacSha512Signature);

            // Describing how the tocken looks
            var tokendescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials  = creds
            };
            // hanler to create the tocken
            var tokenhandler = new JwtSecurityTokenHandler();

            // Creating the token
            var token = tokenhandler.CreateToken(tokendescriptor);
            
            //return the writtentoken whoever needed
            return tokenhandler.WriteToken(token);


        }
    }
}