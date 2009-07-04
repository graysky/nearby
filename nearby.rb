# Add current dir to load path
$:.unshift "#{File.dirname(__FILE__)}"
require 'rubygems'
require 'erb'
require 'sinatra'

# Main page
get '/' do
  erb :index
end

get '/geocode' do
  
  puts "Params: #{params.inspect}"
  
  status 200
  "Success"
end





