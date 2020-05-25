CurrentDrawedLine = {}
--CurrentDrawedLine["uuid"] = {sX=41012,sY=191268,sZ=547,eX=39572,eY=188993,eZ=547,thickness=5}

AddRemoteEvent("World:AddLine3D", function(id, sX, sY, sZ, eX, eY, eZ, thickness)
    CurrentDrawedLine[id] = {sX=sX,sY=sY,sZ=sZ,eX=eX,eY=eY,eZ=eZ,thickness=thickness}
end)

AddEvent("OnGameTick", function(DeltaSeconds)
    for _,line in pairs(CurrentDrawedLine) do 
        DrawLine3D(line.sX, line.sY, line.sZ, line.eX, line.eY, line.eZ, line.thickness)
    end
end)

AddRemoteEvent("World:DeleteLine3D", function(id)
    CurrentDrawedLine[id] = nil
end)
