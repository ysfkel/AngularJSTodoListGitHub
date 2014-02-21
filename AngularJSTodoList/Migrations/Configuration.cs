namespace AngularJSTodoList.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using AngularJSTodoList.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<AngularJSTodoList.Models.AngularJSTodoListContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "AngularJSTodoList.Models.AngularJSTodoListContext";
        }

        protected override void Seed(AngularJSTodoList.Models.AngularJSTodoListContext context)
        {
            var r = new Random();
            var items = Enumerable.Range(1, 50).Select(o => new Todo
            {

                DueDate = new DateTime(2012, r.Next(1, 12), r.Next(1, 28)),
                Priority = (byte)r.Next(10),
                Text = o.ToString()

            }).ToArray();
            context.Todoes.AddOrUpdate(item => new { item.Text }, items);
        }
    }
}
