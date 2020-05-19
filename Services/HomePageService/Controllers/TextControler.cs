using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HomePageService.Data;
using HomePageService.Dtos;
using HomePageService.Models;

namespace HomePageService.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "Employee")]
    [ApiController]
    public class TextControler : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ITextRepository _repository;
        public TextControler(IMapper mapper, ITextRepository repository)
        {
            _repository = repository;
            _mapper = mapper;
        }
        [AllowAnonymous]
        [HttpGet("textField/{name}")]
        public async Task<IActionResult> GetTextFieldContent(string name)
        {
            var textField = await _repository.GetTextField(name);
            if (textField == null)
            {
                return NotFound($"Pole tekstowe o nazwie: {name}, nie istnieje");
            }
            return Ok(textField.Content);
        }
        [HttpPut("textField/{name}")]
        public async Task<IActionResult> UpdateTextFieldContent(string name, TextFieldForUpdateDto newContent)
        {
            var textField = await _repository.GetTextField(name);
            if (textField == null)
            {
                return NotFound($"Pole tekstowe o nazwie: {name}, które próbowałeś zmodyfikować, nie istnieje");
            }
            textField.Content = newContent.newContent;
            if (await _repository.SaveAll())
            {
                return NoContent();
            }
            throw new Exception("Nie udało się zapisać zmian w polu tekstowym");
        }
    }
}