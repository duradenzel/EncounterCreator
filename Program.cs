using EncounterBLL.Factories;
using MonsterApiDAL;
using EncounterInterfaces;


var builder = WebApplication.CreateBuilder(args);

builder.Logging.AddConsole();
builder.Services.AddControllersWithViews();
builder.Services.AddMemoryCache();

builder.Services.AddScoped<IEncounterService, EncounterService>();
builder.Services.AddScoped<IMonsterApiService, MonsterApi>();
builder.Services.AddScoped<IDataAccessFactory, DataAccessFactory>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
