# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(
    username: 'John Doe',
    email: 'jd@jd.com', 
    password: 'jd123456',
    password_confirmation: 'jd123456'
)
user.save!

portfolio = Portfolio.create(
    portfolio_name: 'Technology',
    user_id: 1
)
portfolio.save!